import Reptil from "./Reptil";

export default class Tartaruga extends Reptil {
    private aquatica: boolean;

    constructor(nome: string, idade: number, raca: string, peso: number, temperaturaIdeal: number, aquatica: boolean) {
        super(nome, idade, raca, peso, temperaturaIdeal);
        this.aquatica = aquatica;
    }

    public cuidadosRecomendados(): string {
        return "Ambiente aquecido e dieta rica em cálcio.";
    }

    public fatorServico(): number {
        return 0.85;
    }

    public descricao(): string {
        return `[Tartaruga] ${super.descricao()} - Temp. ideal: ${this.getTemperaturaIdeal()}°C, ${this.aquatica ? "Aquática" : "Terrestre"}`;
    }
}
