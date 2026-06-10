import Entrada from "../util/Entrada";
import MainController from "../control/MainController";
import AnimalRegister from "./AnimalRegister";
import ClienteRegister from "./ClienteRegister";
import ServicoRegister from "./ServicoRegister";
import Descritivel from "../interface/Descritivel";

export default class FirstScreen {
    private controller: MainController;
    private animalRegister: AnimalRegister;
    private clienteRegister: ClienteRegister;
    private servicoRegister: ServicoRegister;

    // Todas as dependências chegam pelo construtor (injeção).
    constructor(
        controller: MainController,
        animalRegister: AnimalRegister,
        clienteRegister: ClienteRegister,
        servicoRegister: ServicoRegister
    ) {
        this.controller = controller;
        this.animalRegister = animalRegister;
        this.clienteRegister = clienteRegister;
        this.servicoRegister = servicoRegister;
    }

    public iniciar(): void {
        let aberto = true;
        while (aberto) {
            console.log("\n===== PET SHOP =====");
            const opcao = Entrada.opcao("Escolha uma opção:", [
                "Cadastrar Animal",
                "Cadastrar Cliente",
                "Vincular Animal a Cliente",
                "Agendar Serviço",
                "Atualizar Status de Serviço",
                "Listar Animais",
                "Listar Clientes",
                "Listar Serviços",
                "Buscar Animal",
                "Listar Animais por Idade",
                "Relatório do Pet Shop",
                "Sair"
            ]);

            switch (opcao) {
                case 0: this.animalRegister.registrar(); break;
                case 1: this.clienteRegister.registrar(); break;
                case 2: this.vincularAnimal(); break;
                case 3: this.servicoRegister.registrar(); break;
                case 4: this.atualizarStatusServico(); break;
                case 5: this.imprimirLista("Animais Cadastrados", this.controller.listarAnimais()); break;
                case 6: this.listarClientes(); break;
                case 7: this.imprimirLista("Serviços", this.controller.listarServicos()); break;
                case 8: this.buscarAnimal(); break;
                case 9: this.imprimirLista("Animais por Idade", this.controller.listarAnimaisPorIdade()); break;
                case 10: this.exibirRelatorio(); break;
                case 11: console.log("Saindo do sistema..."); aberto = false; break;
            }
        }
    }

    private vincularAnimal(): void {
        console.log("\n--- Vincular Animal a Cliente ---");
        const clientes = this.controller.listarClientes();
        if (clientes.length === 0) {
            console.log("Cadastre um cliente primeiro.");
            return;
        }
        const semDono = this.controller.animaisSemDono();
        if (semDono.length === 0) {
            console.log("Não há animais sem dono para vincular.");
            return;
        }

        const indiceCliente = Entrada.opcao("Cliente:", clientes.map(c => c.descricao()));
        const indiceAnimal = Entrada.opcao("Animal sem dono:", semDono.map(a => a.descricao()));
        try {
            this.controller.vincularAnimalAoCliente(clientes[indiceCliente], semDono[indiceAnimal]);
            console.log("Animal vinculado com sucesso!");
        } catch (erro) {
            if (erro instanceof Error) {
                console.log("Erro: " + erro.message);
            }
        }
    }

    private atualizarStatusServico(): void {
        console.log("\n--- Atualizar Status de Serviço ---");
        const servicos = this.controller.listarServicos();
        if (servicos.length === 0) {
            console.log("Nenhum serviço agendado.");
            return;
        }
        const indice = Entrada.opcao("Serviço:", servicos.map(s => s.descricao()));
        const servico = servicos[indice];

        const acao = Entrada.opcao("Ação:", ["Concluir", "Cancelar"]);
        if (acao === 0) {
            this.controller.concluirServico(servico);
            console.log("Serviço concluído.");
        } else {
            this.controller.cancelarServico(servico);
            console.log("Serviço cancelado.");
        }
    }

    // Polimorfismo via interface: serve para qualquer lista de Descritivel
    // (Animal, Cliente ou Servico), sem precisar saber o tipo concreto.
    private imprimirLista(titulo: string, itens: Descritivel[]): void {
        console.log(`\n--- ${titulo} ---`);
        if (itens.length === 0) {
            console.log("Nenhum registro encontrado.");
            return;
        }
        itens.forEach(item => console.log(item.descricao()));
    }

    private listarClientes(): void {
        console.log("\n--- Clientes Cadastrados ---");
        const clientes = this.controller.listarClientes();
        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.");
            return;
        }
        clientes.forEach(cliente => {
            console.log(cliente.descricao());
            cliente.getAnimais().forEach(animal => console.log("   -> " + animal.descricao()));
        });
    }

    // Inovação: relatório com os números e o faturamento do pet shop.
    private exibirRelatorio(): void {
        console.log("\n--- Relatório do Pet Shop ---");
        console.log(`Animais cadastrados: ${this.controller.listarAnimais().length}`);
        console.log(`Clientes cadastrados: ${this.controller.listarClientes().length}`);
        console.log(`Serviços registrados: ${this.controller.listarServicos().length}`);
        console.log(`Faturamento previsto (agendados): R$ ${this.controller.faturamentoPrevisto().toFixed(2)}`);
        console.log(`Faturamento realizado (concluídos): R$ ${this.controller.faturamentoRealizado().toFixed(2)}`);
        console.log(`Valor médio por serviço: R$ ${this.controller.valorMedioPorServico().toFixed(2)}`);

        const maisProcurado = this.controller.servicoMaisProcurado();
        console.log(`Serviço mais procurado: ${maisProcurado ?? "—"}`);

        console.log("Faturamento por tipo de serviço:");
        const porTipo = this.controller.faturamentoPorTipo();
        if (porTipo.size === 0) {
            console.log("   (nenhum serviço ativo)");
        } else {
            porTipo.forEach((total, tipo) => {
                console.log(`   ${tipo}: R$ ${total.toFixed(2)}`);
            });
        }
    }

    private buscarAnimal(): void {
        const termo = Entrada.texto("Buscar por nome (texto) ou idade mínima (número): ");
        const comoNumero = parseInt(termo);
        // Aproveita a sobrecarga do controller: string -> busca por nome; number -> por idade.
        const resultado = isNaN(comoNumero)
            ? this.controller.buscarAnimal(termo)
            : this.controller.buscarAnimal(comoNumero);
        this.imprimirLista("Resultado da Busca", resultado);
    }
}
