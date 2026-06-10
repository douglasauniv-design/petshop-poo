import Mamifero from "./Mamifero";
import { PorteAnimal } from "../enum/PorteAnimal";
import { TipoPelagem } from "../enum/TipoPelagem";

export default class Cachorro extends Mamifero {
    private porte: PorteAnimal;
    private adestrado: boolean;

    constructor(nome: string, idade: number, raca: string, peso: number, pelagem: TipoPelagem, porte: PorteAnimal, adestrado: boolean) {
        super(nome, idade, raca, peso, pelagem);
        this.porte = porte;
        this.adestrado = adestrado;
    }

    public cuidadosRecomendados(): string {
        return "Passeios diários e banho conforme a pelagem.";
    }

    // Quanto maior o porte, mais trabalhoso o serviço.
    public fatorServico(): number {
        switch (this.porte) {
            case PorteAnimal.GRANDE: return 1.6;
            case PorteAnimal.MEDIO: return 1.3;
            default: return 1.0;
        }
    }

    public descricao(): string {
        return `[Cachorro] ${super.descricao()} - Porte: ${this.porte}, Pelagem: ${this.getPelagem()}, Adestrado: ${this.adestrado ? "Sim" : "Não"}`;
    }
}
