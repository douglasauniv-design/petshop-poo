import Entrada from "../util/Entrada";
import MainController from "../control/MainController";

export default class ServicoRegister {
    private controller: MainController;

    constructor(controller: MainController) {
        this.controller = controller;
    }

    public registrar(): void {
        console.log("\n--- Agendar Serviço ---");

        const clientes = this.controller.listarClientes();
        if (clientes.length === 0) {
            console.log("Cadastre um cliente antes de agendar um serviço.");
            return;
        }

        const indiceCliente = Entrada.opcao("Cliente:", clientes.map(c => c.descricao()));
        const cliente = clientes[indiceCliente];

        // O serviço é sempre para um animal do próprio cliente.
        const animais = cliente.getAnimais();
        if (animais.length === 0) {
            console.log(`${cliente.getNome()} não tem animais vinculados. Vincule um animal primeiro.`);
            return;
        }
        const indiceAnimal = Entrada.opcao("Animal do cliente:", animais.map(a => a.descricao()));
        const animal = animais[indiceAnimal];

        // Mostra somente os serviços que ESTE animal aceita (com o preço-base).
        const disponiveis = animal.servicosDisponiveis();
        const rotulos = disponiveis.map(
            tipo => `${tipo} (base R$ ${this.controller.precoBaseServico(tipo).toFixed(2)})`
        );
        const indiceServico = Entrada.opcao(`Serviços disponíveis para ${animal.getNome()}:`, rotulos);
        const tipo = disponiveis[indiceServico];

        try {
            const servico = this.controller.agendarServico(tipo, cliente, animal);
            console.log(`Serviço agendado! Valor: R$ ${servico.getPreco().toFixed(2)}`);
        } catch (erro) {
            if (erro instanceof Error) {
                console.log("Erro: " + erro.message);
            }
        }
    }
}
