import Animal from "./Animal";
import { TipoPelagem } from "../enum/TipoPelagem";
import { TipoServico } from "../enum/TipoServico";

// Classe abstrata intermediária. Agrupa o que é comum aos mamíferos:
// a pelagem e os serviços disponíveis (todos). Evita repetição (DRY).
export default abstract class Mamifero extends Animal {
    private pelagem: TipoPelagem;

    constructor(nome: string, idade: number, raca: string, peso: number, pelagem: TipoPelagem) {
        super(nome, idade, raca, peso);
        this.pelagem = pelagem;
    }

    public getPelagem(): TipoPelagem {
        return this.pelagem;
    }

    public servicosDisponiveis(): TipoServico[] {
        return [TipoServico.BANHO, TipoServico.TOSA, TipoServico.CONSULTA, TipoServico.VACINA];
    }
}
