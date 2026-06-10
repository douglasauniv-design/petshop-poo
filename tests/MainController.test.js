"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../src/Database"));
const MainController_1 = __importDefault(require("../src/control/MainController"));
const PorteAnimal_1 = require("../src/enum/PorteAnimal");
const TipoPelagem_1 = require("../src/enum/TipoPelagem");
const TipoAgua_1 = require("../src/enum/TipoAgua");
const TipoServico_1 = require("../src/enum/TipoServico");
const ValidacaoException_1 = __importDefault(require("../src/exception/ValidacaoException"));
describe("MainController", () => {
    let controller;
    beforeEach(() => {
        // Injeção de dependência também facilita o teste:
        // criamos o controller com um Database "limpo".
        controller = new MainController_1.default(new Database_1.default());
    });
    test("cadastra um cachorro com sucesso", () => {
        controller.cadastrarCachorro("Rex", 3, "Labrador", 30, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.GRANDE, true);
        expect(controller.quantidadeAnimais()).toBe(1);
        expect(controller.listarAnimais()[0].getNome()).toBe("Rex");
    });
    test("cachorro também possui pelagem (herdada de Mamifero)", () => {
        const cachorro = controller.cadastrarCachorro("Rex", 3, "Labrador", 30, TipoPelagem_1.TipoPelagem.LONGA, PorteAnimal_1.PorteAnimal.GRANDE, true);
        expect(cachorro.getPelagem()).toBe(TipoPelagem_1.TipoPelagem.LONGA);
    });
    test("cadastra coelho e peixe (novos tipos)", () => {
        controller.cadastrarCoelho("Pipoca", 1, "Anão", 2, TipoPelagem_1.TipoPelagem.CURTA, true);
        controller.cadastrarPeixe("Nemo", 1, "Palhaço", 0.1, TipoAgua_1.TipoAgua.SALGADA);
        expect(controller.quantidadeAnimais()).toBe(2);
    });
    test("lança exceção personalizada para idade inválida", () => {
        expect(() => {
            controller.cadastrarGato("Mimi", -1, "Siamês", 4, TipoPelagem_1.TipoPelagem.CURTA, false);
        }).toThrow(ValidacaoException_1.default);
    });
    test("lança exceção para nome vazio", () => {
        expect(() => {
            controller.cadastrarCachorro("", 2, "SRD", 10, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.PEQUENO, false);
        }).toThrow("O nome não pode ser vazio.");
    });
    test("busca animal por nome (sobrecarga com string)", () => {
        controller.cadastrarCachorro("Rex", 3, "Labrador", 30, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.GRANDE, true);
        controller.cadastrarGato("Mimi", 2, "Siamês", 4, TipoPelagem_1.TipoPelagem.CURTA, false);
        const resultado = controller.buscarAnimal("rex");
        expect(resultado).toHaveLength(1);
        expect(resultado[0].getNome()).toBe("Rex");
    });
    test("busca animal por idade mínima (sobrecarga com number)", () => {
        controller.cadastrarCachorro("Rex", 3, "Labrador", 30, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.GRANDE, true);
        controller.cadastrarGato("Mimi", 1, "Siamês", 4, TipoPelagem_1.TipoPelagem.CURTA, false);
        const resultado = controller.buscarAnimal(2);
        expect(resultado).toHaveLength(1);
        expect(resultado[0].getNome()).toBe("Rex");
    });
    test("ordena animais por idade (crescente)", () => {
        controller.cadastrarCachorro("Rex", 5, "Labrador", 30, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.GRANDE, true);
        controller.cadastrarGato("Mimi", 1, "Siamês", 4, TipoPelagem_1.TipoPelagem.CURTA, false);
        const ordenados = controller.listarAnimaisPorIdade();
        expect(ordenados[0].getNome()).toBe("Mimi");
        expect(ordenados[1].getNome()).toBe("Rex");
    });
    test("polimorfismo: cada animal tem seus cuidados recomendados", () => {
        const cachorro = controller.cadastrarCachorro("Rex", 3, "Labrador", 30, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.GRANDE, true);
        const peixe = controller.cadastrarPeixe("Nemo", 1, "Palhaço", 0.1, TipoAgua_1.TipoAgua.SALGADA);
        expect(cachorro.cuidadosRecomendados()).toContain("Passeio");
        expect(peixe.cuidadosRecomendados()).toContain("água");
    });
    test("vínculo: ao vincular, o animal passa a conhecer seu dono", () => {
        const cachorro = controller.cadastrarCachorro("Rex", 3, "Labrador", 30, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.GRANDE, true);
        const cliente = controller.cadastrarCliente("João", "99999-9999");
        controller.vincularAnimalAoCliente(cliente, cachorro);
        expect(cachorro.getDono()).toBe(cliente);
        expect(cliente.getAnimais()).toHaveLength(1);
    });
    test("regra: um animal não pode ter dois donos", () => {
        const cachorro = controller.cadastrarCachorro("Rex", 3, "Labrador", 30, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.GRANDE, true);
        const joao = controller.cadastrarCliente("João", "99999-9999");
        const ana = controller.cadastrarCliente("Ana", "8888-8888");
        controller.vincularAnimalAoCliente(joao, cachorro);
        expect(() => controller.vincularAnimalAoCliente(ana, cachorro)).toThrow(ValidacaoException_1.default);
    });
    test("regra: só dá para agendar serviço para um animal do próprio cliente", () => {
        const cachorro = controller.cadastrarCachorro("Rex", 3, "Labrador", 30, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.GRANDE, true);
        const joao = controller.cadastrarCliente("João", "99999-9999");
        const ana = controller.cadastrarCliente("Ana", "8888-8888");
        controller.vincularAnimalAoCliente(joao, cachorro);
        // Ana tenta agendar para o cachorro do João:
        expect(() => controller.agendarServico(TipoServico_1.TipoServico.BANHO, ana, cachorro)).toThrow(ValidacaoException_1.default);
    });
    test("preço do serviço é calculado: preço-base x fator do animal", () => {
        const cachorro = controller.cadastrarCachorro("Rex", 3, "Labrador", 30, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.GRANDE, true);
        const cliente = controller.cadastrarCliente("João", "99999-9999");
        controller.vincularAnimalAoCliente(cliente, cachorro);
        const servico = controller.agendarServico(TipoServico_1.TipoServico.BANHO, cliente, cachorro);
        // Banho (R$50) x fator do cachorro grande (1.6) = R$80
        expect(servico.getPreco()).toBeCloseTo(80);
    });
    test("regra de serviço: peixe não pode tomar banho", () => {
        const peixe = controller.cadastrarPeixe("Nemo", 1, "Palhaço", 0.1, TipoAgua_1.TipoAgua.SALGADA);
        const cliente = controller.cadastrarCliente("Ana", "8888-8888");
        controller.vincularAnimalAoCliente(cliente, peixe);
        expect(() => controller.agendarServico(TipoServico_1.TipoServico.BANHO, cliente, peixe)).toThrow(ValidacaoException_1.default);
    });
    test("répteis aceitam apenas consulta e vacina", () => {
        const lagarto = controller.cadastrarLagarto("Iggy", 2, "Iguana", 3, 30, 50);
        const tartaruga = controller.cadastrarTartaruga("Donatello", 5, "Tigre-d'água", 1, 26, true);
        expect(lagarto.servicosDisponiveis()).toEqual([TipoServico_1.TipoServico.CONSULTA, TipoServico_1.TipoServico.VACINA]);
        expect(tartaruga.servicosDisponiveis()).toEqual([TipoServico_1.TipoServico.CONSULTA, TipoServico_1.TipoServico.VACINA]);
    });
    test("status: concluir um serviço alimenta o faturamento realizado", () => {
        const cachorro = controller.cadastrarCachorro("Rex", 3, "Labrador", 30, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.MEDIO, true);
        const cliente = controller.cadastrarCliente("João", "99999-9999");
        controller.vincularAnimalAoCliente(cliente, cachorro);
        const servico = controller.agendarServico(TipoServico_1.TipoServico.BANHO, cliente, cachorro); // 50 x 1.3 = 65
        expect(controller.faturamentoRealizado()).toBe(0);
        controller.concluirServico(servico);
        expect(controller.faturamentoRealizado()).toBeCloseTo(65);
    });
    test("status: serviço cancelado não conta no faturamento previsto", () => {
        const cachorro = controller.cadastrarCachorro("Rex", 3, "Labrador", 30, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.MEDIO, true);
        const cliente = controller.cadastrarCliente("João", "99999-9999");
        controller.vincularAnimalAoCliente(cliente, cachorro);
        const s1 = controller.agendarServico(TipoServico_1.TipoServico.BANHO, cliente, cachorro); // 65
        controller.agendarServico(TipoServico_1.TipoServico.TOSA, cliente, cachorro); // 52
        controller.cancelarServico(s1);
        expect(controller.faturamentoPrevisto()).toBeCloseTo(52);
    });
    test("relatório: valor médio por serviço considera serviços não cancelados", () => {
        const cachorro = controller.cadastrarCachorro("Rex", 3, "Labrador", 30, TipoPelagem_1.TipoPelagem.CURTA, PorteAnimal_1.PorteAnimal.MEDIO, true);
        const cliente = controller.cadastrarCliente("João", "99999-9999");
        controller.vincularAnimalAoCliente(cliente, cachorro);
        controller.agendarServico(TipoServico_1.TipoServico.BANHO, cliente, cachorro); // 50 x 1.3 = 65
        controller.agendarServico(TipoServico_1.TipoServico.TOSA, cliente, cachorro); // 40 x 1.3 = 52
        // (65 + 52) / 2 = 58.5
        expect(controller.valorMedioPorServico()).toBeCloseTo(58.5);
    });
    test("relatório: serviço mais procurado (ignora cancelados)", () => {
        const gato = controller.cadastrarGato("Mimi", 2, "Siamês", 4, TipoPelagem_1.TipoPelagem.CURTA, false);
        const cliente = controller.cadastrarCliente("Ana", "8888-8888");
        controller.vincularAnimalAoCliente(cliente, gato);
        controller.agendarServico(TipoServico_1.TipoServico.BANHO, cliente, gato);
        controller.agendarServico(TipoServico_1.TipoServico.BANHO, cliente, gato);
        controller.agendarServico(TipoServico_1.TipoServico.TOSA, cliente, gato);
        expect(controller.servicoMaisProcurado()).toBe(TipoServico_1.TipoServico.BANHO);
    });
});
