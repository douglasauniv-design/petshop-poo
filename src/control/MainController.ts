import Database from "../Database";
import Animal from "../model/Animal";
import Cachorro from "../model/Cachorro";
import Gato from "../model/Gato";
import Ave from "../model/Ave";
import Coelho from "../model/Coelho";
import Lagarto from "../model/Lagarto";
import Tartaruga from "../model/Tartaruga";
import Peixe from "../model/Peixe";
import Cliente from "../model/Cliente";
import Servico from "../model/Servico";
import TabelaPrecos from "../model/TabelaPrecos";
import ValidacaoException from "../exception/ValidacaoException";
import { PorteAnimal } from "../enum/PorteAnimal";
import { TipoPelagem } from "../enum/TipoPelagem";
import { TipoAgua } from "../enum/TipoAgua";
import { TipoServico } from "../enum/TipoServico";
import { StatusServico } from "../enum/StatusServico";

export default class MainController {
    private database: Database;

    // Injeção de Dependência: o Database é recebido por parâmetro,
    // o controller não cria essa dependência.
    constructor(database: Database) {
        this.database = database;
    }

    private validarDadosBasicos(nome: string, idade: number, peso: number): void {
        if (!nome || nome.trim().length === 0) {
            throw new ValidacaoException("O nome não pode ser vazio.");
        }
        if (isNaN(idade) || idade < 0) {
            throw new ValidacaoException("Idade inválida.");
        }
        if (isNaN(peso) || peso <= 0) {
            throw new ValidacaoException("Peso inválido.");
        }
    }

    // ---- Animais: o "new" dos modelos acontece aqui, nunca na view.
    //      Cada método devolve o animal criado para a view exibir os cuidados. ----
    public cadastrarCachorro(nome: string, idade: number, raca: string, peso: number, pelagem: TipoPelagem, porte: PorteAnimal, adestrado: boolean): Cachorro {
        this.validarDadosBasicos(nome, idade, peso);
        const cachorro = new Cachorro(nome, idade, raca, peso, pelagem, porte, adestrado);
        this.database.getAnimais().adicionar(cachorro);
        return cachorro;
    }

    public cadastrarGato(nome: string, idade: number, raca: string, peso: number, pelagem: TipoPelagem, castrado: boolean): Gato {
        this.validarDadosBasicos(nome, idade, peso);
        const gato = new Gato(nome, idade, raca, peso, pelagem, castrado);
        this.database.getAnimais().adicionar(gato);
        return gato;
    }

    public cadastrarAve(nome: string, idade: number, raca: string, peso: number, voa: boolean): Ave {
        this.validarDadosBasicos(nome, idade, peso);
        const ave = new Ave(nome, idade, raca, peso, voa);
        this.database.getAnimais().adicionar(ave);
        return ave;
    }

    public cadastrarCoelho(nome: string, idade: number, raca: string, peso: number, pelagem: TipoPelagem, vacinado: boolean): Coelho {
        this.validarDadosBasicos(nome, idade, peso);
        const coelho = new Coelho(nome, idade, raca, peso, pelagem, vacinado);
        this.database.getAnimais().adicionar(coelho);
        return coelho;
    }

    public cadastrarLagarto(nome: string, idade: number, raca: string, peso: number, temperaturaIdeal: number, tamanhoCm: number): Lagarto {
        this.validarDadosBasicos(nome, idade, peso);
        const lagarto = new Lagarto(nome, idade, raca, peso, temperaturaIdeal, tamanhoCm);
        this.database.getAnimais().adicionar(lagarto);
        return lagarto;
    }

    public cadastrarTartaruga(nome: string, idade: number, raca: string, peso: number, temperaturaIdeal: number, aquatica: boolean): Tartaruga {
        this.validarDadosBasicos(nome, idade, peso);
        const tartaruga = new Tartaruga(nome, idade, raca, peso, temperaturaIdeal, aquatica);
        this.database.getAnimais().adicionar(tartaruga);
        return tartaruga;
    }

    public cadastrarPeixe(nome: string, idade: number, raca: string, peso: number, tipoAgua: TipoAgua): Peixe {
        this.validarDadosBasicos(nome, idade, peso);
        const peixe = new Peixe(nome, idade, raca, peso, tipoAgua);
        this.database.getAnimais().adicionar(peixe);
        return peixe;
    }

    public listarAnimais(): Animal[] {
        return this.database.getAnimais().listar();
    }

    public quantidadeAnimais(): number {
        return this.database.getAnimais().tamanho;
    }

    // Animais que ainda não têm dono (usado ao vincular a um cliente).
    public animaisSemDono(): Animal[] {
        return this.database.getAnimais().buscar(animal => !animal.temDono());
    }

    // SOBRECARGA: o mesmo método busca por nome (string) ou idade mínima (number).
    public buscarAnimal(nome: string): Animal[];
    public buscarAnimal(idadeMinima: number): Animal[];
    public buscarAnimal(criterio: string | number): Animal[] {
        if (typeof criterio === "string") {
            return this.database.getAnimais().buscar(a => a.getNome().toLowerCase().includes(criterio.toLowerCase()));
        }
        return this.database.getAnimais().buscar(a => a.getIdade() >= criterio);
    }

    // Ordenação por idade (crescente).
    public listarAnimaisPorIdade(): Animal[] {
        return this.database.getAnimais().ordenar((a, b) => a.getIdade() - b.getIdade());
    }

    // ---- Clientes ----
    public cadastrarCliente(nome: string, telefone: string): Cliente {
        if (!nome || nome.trim().length === 0) {
            throw new ValidacaoException("O nome do cliente não pode ser vazio.");
        }
        const cliente = new Cliente(nome, telefone);
        this.database.getClientes().adicionar(cliente);
        return cliente;
    }

    public listarClientes(): Cliente[] {
        return this.database.getClientes().listar();
    }

    // Um animal só pode ter um dono.
    public vincularAnimalAoCliente(cliente: Cliente, animal: Animal): void {
        if (animal.temDono()) {
            throw new ValidacaoException(`${animal.getNome()} já tem um dono.`);
        }
        cliente.adicionarAnimal(animal);
    }

    // ---- Serviços ----
    public precoBaseServico(tipo: TipoServico): number {
        return TabelaPrecos.precoBase(tipo);
    }

    // Regras: o animal precisa ser do cliente e precisa aceitar o serviço.
    // Preço calculado (polimorfismo): preço-base x fator do animal.
    public agendarServico(tipo: TipoServico, cliente: Cliente, animal: Animal): Servico {
        if (animal.getDono() !== cliente) {
            throw new ValidacaoException(`${animal.getNome()} não pertence a ${cliente.getNome()}.`);
        }
        if (!animal.servicosDisponiveis().includes(tipo)) {
            throw new ValidacaoException(`${animal.getNome()} não pode receber o serviço de ${tipo}.`);
        }
        const preco = TabelaPrecos.precoBase(tipo) * animal.fatorServico();
        const servico = new Servico(tipo, preco, cliente, animal);
        this.database.getServicos().adicionar(servico);
        return servico;
    }

    public listarServicos(): Servico[] {
        return this.database.getServicos().listar();
    }

    public concluirServico(servico: Servico): void {
        servico.concluir();
    }

    public cancelarServico(servico: Servico): void {
        servico.cancelar();
    }

    // ---- Relatório (inovação) ----
    // Serviços que ainda contam para o faturamento (não cancelados).
    private servicosAtivos(): Servico[] {
        return this.database.getServicos().buscar(s => s.getStatus() !== StatusServico.CANCELADO);
    }

    // Faturamento a receber: serviços ainda agendados.
    public faturamentoPrevisto(): number {
        return this.database.getServicos()
            .buscar(s => s.getStatus() === StatusServico.AGENDADO)
            .reduce((total, s) => total + s.getPreco(), 0);
    }

    // Faturamento já realizado: apenas os concluídos.
    public faturamentoRealizado(): number {
        return this.database.getServicos()
            .buscar(s => s.getStatus() === StatusServico.CONCLUIDO)
            .reduce((total, s) => total + s.getPreco(), 0);
    }

    public valorMedioPorServico(): number {
        const servicos = this.servicosAtivos();
        if (servicos.length === 0) {
            return 0;
        }
        return (this.faturamentoPrevisto() + this.faturamentoRealizado()) / servicos.length;
    }

    public faturamentoPorTipo(): Map<TipoServico, number> {
        const mapa = new Map<TipoServico, number>();
        this.servicosAtivos().forEach(servico => {
            const atual = mapa.get(servico.getTipo()) ?? 0;
            mapa.set(servico.getTipo(), atual + servico.getPreco());
        });
        return mapa;
    }

    public servicoMaisProcurado(): TipoServico | null {
        const contagem = new Map<TipoServico, number>();
        this.servicosAtivos().forEach(servico => {
            const atual = contagem.get(servico.getTipo()) ?? 0;
            contagem.set(servico.getTipo(), atual + 1);
        });

        let maisProcurado: TipoServico | null = null;
        let maior = 0;
        contagem.forEach((quantidade, tipo) => {
            if (quantidade > maior) {
                maior = quantidade;
                maisProcurado = tipo;
            }
        });
        return maisProcurado;
    }
}
