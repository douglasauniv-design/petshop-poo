import Animal from "./Animal";
import { TipoAgua } from "../enum/TipoAgua";
import { TipoServico } from "../enum/TipoServico";

export default class Peixe extends Animal {
    private tipoAgua: TipoAgua;

    constructor(nome: string, idade: number, raca: string, peso: number, tipoAgua: TipoAgua) {
        super(nome, idade, raca, peso);
        this.tipoAgua = tipoAgua;
    }

    public cuidadosRecomendados(): string {
        return "Controlar a temperatura e a qualidade da água do aquário.";
    }

    public fatorServico(): number {
        return 0.7;
    }

    public servicosDisponiveis(): TipoServico[] {
        return [TipoServico.CONSULTA];
    }

    public descricao(): string {
        return `[Peixe] ${super.descricao()} - ${this.tipoAgua}`;
    }
}
