import Mamifero from "./Mamifero";
import { TipoPelagem } from "../enum/TipoPelagem";

export default class Coelho extends Mamifero {
    private vacinado: boolean;

    constructor(nome: string, idade: number, raca: string, peso: number, pelagem: TipoPelagem, vacinado: boolean) {
        super(nome, idade, raca, peso, pelagem);
        this.vacinado = vacinado;
    }

    public cuidadosRecomendados(): string {
        return "Dieta rica em feno e espaço para se exercitar.";
    }

    public fatorServico(): number {
        return 0.9;
    }

    public descricao(): string {
        return `[Coelho] ${super.descricao()} - Pelagem: ${this.getPelagem()}, Vacinado: ${this.vacinado ? "Sim" : "Não"}`;
    }
}
