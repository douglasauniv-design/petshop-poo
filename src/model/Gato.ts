import Mamifero from "./Mamifero";
import { TipoPelagem } from "../enum/TipoPelagem";

export default class Gato extends Mamifero {
    private castrado: boolean;

    constructor(nome: string, idade: number, raca: string, peso: number, pelagem: TipoPelagem, castrado: boolean) {
        super(nome, idade, raca, peso, pelagem);
        this.castrado = castrado;
    }

    public cuidadosRecomendados(): string {
        return "Manter a caixa de areia limpa e um arranhador disponível.";
    }

    public fatorServico(): number {
        return 1.0;
    }

    public descricao(): string {
        return `[Gato] ${super.descricao()} - Pelagem: ${this.getPelagem()}, Castrado: ${this.castrado ? "Sim" : "Não"}`;
    }
}
