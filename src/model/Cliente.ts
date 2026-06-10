import Animal from "./Animal";
import Descritivel from "../interface/Descritivel";

export default class Cliente implements Descritivel {
    private nome: string;
    private telefone: string;
    private animais: Animal[];

    constructor(nome: string, telefone: string) {
        this.nome = nome;
        this.telefone = telefone;
        this.animais = [];
    }

    public getNome(): string { return this.nome; }
    public getTelefone(): string { return this.telefone; }
    public getAnimais(): Animal[] { return [...this.animais]; }

    // Associação: um cliente possui vários animais, e o animal passa a
    // conhecer seu dono (relação bidirecional).
    public adicionarAnimal(animal: Animal): void {
        this.animais.push(animal);
        animal.setDono(this);
    }

    public descricao(): string {
        return `${this.nome} - Tel: ${this.telefone} - Animais: ${this.animais.length}`;
    }
}
