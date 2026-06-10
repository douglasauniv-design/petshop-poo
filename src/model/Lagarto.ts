import Reptil from "./Reptil";

export default class Lagarto extends Reptil {
    private tamanhoCm: number;

    constructor(nome: string, idade: number, raca: string, peso: number, temperaturaIdeal: number, tamanhoCm: number) {
        super(nome, idade, raca, peso, temperaturaIdeal);
        this.tamanhoCm = tamanhoCm;
    }

    public cuidadosRecomendados(): string {
        return "Terrário aquecido e exposição diária à luz UVB.";
    }

    public fatorServico(): number {
        return 0.8;
    }

    public descricao(): string {
        return `[Lagarto] ${super.descricao()} - Temp. ideal: ${this.getTemperaturaIdeal()}°C, Tamanho: ${this.tamanhoCm}cm`;
    }
}
