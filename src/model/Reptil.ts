import Animal from "./Animal";
import { TipoServico } from "../enum/TipoServico";

// Classe abstrata intermediária para répteis. Eles compartilham a necessidade
// de temperatura controlada e recebem apenas consulta e vacina
// (não tomam banho nem fazem tosa).
export default abstract class Reptil extends Animal {
    private temperaturaIdeal: number;

    constructor(nome: string, idade: number, raca: string, peso: number, temperaturaIdeal: number) {
        super(nome, idade, raca, peso);
        this.temperaturaIdeal = temperaturaIdeal;
    }

    public getTemperaturaIdeal(): number {
        return this.temperaturaIdeal;
    }

    public servicosDisponiveis(): TipoServico[] {
        return [TipoServico.CONSULTA, TipoServico.VACINA];
    }
}
