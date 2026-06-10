import Entrada from "../util/Entrada";
import MainController from "../control/MainController";

export default class ClienteRegister {
    private controller: MainController;

    constructor(controller: MainController) {
        this.controller = controller;
    }

    public registrar(): void {
        console.log("\n--- Cadastro de Cliente ---");
        const nome = Entrada.texto("Nome do cliente: ");
        const telefone = Entrada.texto("Telefone: ");

        try {
            const cliente = this.controller.cadastrarCliente(nome, telefone);

            let semDono = this.controller.animaisSemDono();
            let vincular = semDono.length > 0 && Entrada.simNao("Vincular um animal ao cliente?");
            while (vincular) {
                const indice = Entrada.opcao("Animais sem dono:", semDono.map(a => a.descricao()));
                this.controller.vincularAnimalAoCliente(cliente, semDono[indice]);
                console.log("Animal vinculado!");
                semDono = this.controller.animaisSemDono();
                vincular = semDono.length > 0 && Entrada.simNao("Vincular outro animal?");
            }
            console.log("Cliente cadastrado com sucesso!");
        } catch (erro) {
            if (erro instanceof Error) {
                console.log("Erro: " + erro.message);
            }
        }
    }
}
