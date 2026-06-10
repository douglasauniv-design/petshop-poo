import Animal from "./Animal";
import { TipoServico } from "../enum/TipoServico";

export default class Ave extends Animal {
    private voa: boolean;

    constructor(nome: string, idade: number, raca: string, peso: number, voa: boolean) {
        super(nome, idade, raca, peso);
        this.voa = voa;
    }

    public cuidadosRecomendados(): string {
        return "Gaiola arejada, limpa e longe de correntes de ar.";
    }

    public fatorServico(): number {
        return 0.8;
    }

    public servicosDisponiveis(): TipoServico[] {
        return [TipoServico.BANHO, TipoServico.CONSULTA, TipoServico.VACINA];
    }

    public descricao(): string {
        return `[Ave] ${super.descricao()} - Voa: ${this.voa ? "Sim" : "Não"}`;
    }
}
