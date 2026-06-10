import Entrada from "../util/Entrada";
import MainController from "../control/MainController";
import Animal from "../model/Animal";
import { PorteAnimal } from "../enum/PorteAnimal";
import { TipoPelagem } from "../enum/TipoPelagem";
import { TipoAgua } from "../enum/TipoAgua";

export default class AnimalRegister {
    private controller: MainController;

    // O controller é INJETADO. A view não cria nada com "new".
    constructor(controller: MainController) {
        this.controller = controller;
    }

    public registrar(): void {
        console.log("\n--- Cadastro de Animal ---");
        const tipo = Entrada.opcao("Tipo do animal:", [
            "Cachorro", "Gato", "Coelho", "Ave", "Lagarto", "Tartaruga", "Peixe"
        ]);

        try {
            let animal: Animal;
            switch (tipo) {
                case 0: animal = this.registrarCachorro(); break;
                case 1: animal = this.registrarGato(); break;
                case 2: animal = this.registrarCoelho(); break;
                case 3: animal = this.registrarAve(); break;
                case 4: animal = this.registrarLagarto(); break;
                case 5: animal = this.registrarTartaruga(); break;
                default: animal = this.registrarPeixe(); break;
            }
            // Exibe a dica de cuidado do animal recém-cadastrado (polimorfismo).
            console.log("Animal cadastrado com sucesso!");
            console.log("Cuidado recomendado: " + animal.cuidadosRecomendados());
        } catch (erro) {
            // Captura a exceção personalizada lançada pelo controller.
            if (erro instanceof Error) {
                console.log("Erro ao cadastrar: " + erro.message);
            }
        }
    }

    // Lê os dados comuns a qualquer animal (evita repetição nas subrotinas).
    private dadosBasicos(): { nome: string; idade: number; raca: string; peso: number } {
        const nome = Entrada.texto("Nome: ");
        const idade = Entrada.inteiro("Idade (anos): ", 0, 100);
        const raca = Entrada.texto("Raça/Espécie: ");
        const peso = Entrada.numero("Peso (kg): ", 0.01);
        return { nome, idade, raca, peso };
    }

    private registrarCachorro(): Animal {
        const d = this.dadosBasicos();
        const pelagem = this.lerPelagem();
        const porte = this.lerPorte();
        const adestrado = Entrada.simNao("Adestrado?");
        return this.controller.cadastrarCachorro(d.nome, d.idade, d.raca, d.peso, pelagem, porte, adestrado);
    }

    private registrarGato(): Animal {
        const d = this.dadosBasicos();
        const pelagem = this.lerPelagem();
        const castrado = Entrada.simNao("Castrado?");
        return this.controller.cadastrarGato(d.nome, d.idade, d.raca, d.peso, pelagem, castrado);
    }

    private registrarCoelho(): Animal {
        const d = this.dadosBasicos();
        const pelagem = this.lerPelagem();
        const vacinado = Entrada.simNao("Vacinado?");
        return this.controller.cadastrarCoelho(d.nome, d.idade, d.raca, d.peso, pelagem, vacinado);
    }

    private registrarAve(): Animal {
        const d = this.dadosBasicos();
        const voa = Entrada.simNao("Voa?");
        return this.controller.cadastrarAve(d.nome, d.idade, d.raca, d.peso, voa);
    }

    private registrarLagarto(): Animal {
        const d = this.dadosBasicos();
        const temperatura = Entrada.inteiro("Temperatura ideal (°C): ", 0, 50);
        const tamanho = Entrada.numero("Tamanho (cm): ", 1);
        return this.controller.cadastrarLagarto(d.nome, d.idade, d.raca, d.peso, temperatura, tamanho);
    }

    private registrarTartaruga(): Animal {
        const d = this.dadosBasicos();
        const temperatura = Entrada.inteiro("Temperatura ideal (°C): ", 0, 50);
        const aquatica = Entrada.simNao("É aquática?");
        return this.controller.cadastrarTartaruga(d.nome, d.idade, d.raca, d.peso, temperatura, aquatica);
    }

    private registrarPeixe(): Animal {
        const d = this.dadosBasicos();
        const opcao = Entrada.opcao("Tipo de água:", ["Doce", "Salgada"]);
        const tipoAgua = opcao === 1 ? TipoAgua.SALGADA : TipoAgua.DOCE;
        return this.controller.cadastrarPeixe(d.nome, d.idade, d.raca, d.peso, tipoAgua);
    }

    private lerPelagem(): TipoPelagem {
        const opcao = Entrada.opcao("Pelagem:", ["Curta", "Longa"]);
        return opcao === 1 ? TipoPelagem.LONGA : TipoPelagem.CURTA;
    }

    private lerPorte(): PorteAnimal {
        const opcao = Entrada.opcao("Porte:", ["Pequeno", "Médio", "Grande"]);
        if (opcao === 0) return PorteAnimal.PEQUENO;
        if (opcao === 2) return PorteAnimal.GRANDE;
        return PorteAnimal.MEDIO;
    }
}
