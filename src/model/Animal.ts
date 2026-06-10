import Descritivel from "../interface/Descritivel";
import { TipoServico } from "../enum/TipoServico";
import type Cliente from "./Cliente";

// Classe abstrata: não pode ser instanciada diretamente.
// Implementa a interface Descritivel.
export default abstract class Animal implements Descritivel {
    private nome: string;
    private idade: number;
    private raca: string;
    private peso: number;
    private dono: Cliente | null = null;

    constructor(nome: string, idade: number, raca: string, peso: number) {
        this.nome = nome;
        this.idade = idade;
        this.raca = raca;
        this.peso = peso;
    }

    public getNome(): string { return this.nome; }
    public getIdade(): number { return this.idade; }
    public getRaca(): string { return this.raca; }
    public getPeso(): number { return this.peso; }

    public getDono(): Cliente | null { return this.dono; }
    public temDono(): boolean { return this.dono !== null; }
    public setDono(dono: Cliente): void { this.dono = dono; }

    // Cada animal devolve seus próprios cuidados (polimorfismo).
    public abstract cuidadosRecomendados(): string;

    // Fator que encarece/abarata um serviço. Preço final = base x fator.
    public abstract fatorServico(): number;

    // Quais serviços este animal pode receber (um peixe não toma banho!).
    public abstract servicosDisponiveis(): TipoServico[];

    // Método que as subclasses irão sobrescrever (sobrescrita).
    public descricao(): string {
        const base = `${this.nome} - ${this.raca}, ${this.idade} ano(s), ${this.peso}kg`;
        return this.dono ? `${base} (dono: ${this.dono.getNome()})` : `${base} (sem dono)`;
    }
}
