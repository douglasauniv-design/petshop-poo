import Animal from "./Animal";
import Cliente from "./Cliente";
import Descritivel from "../interface/Descritivel";
import { TipoServico } from "../enum/TipoServico";
import { StatusServico } from "../enum/StatusServico";

export default class Servico implements Descritivel {
    private tipo: TipoServico;
    private preco: number;
    private cliente: Cliente;
    private animal: Animal;
    private status: StatusServico;

    constructor(tipo: TipoServico, preco: number, cliente: Cliente, animal: Animal) {
        this.tipo = tipo;
        this.preco = preco;
        this.cliente = cliente;
        this.animal = animal;
        this.status = StatusServico.AGENDADO;
    }

    public getTipo(): TipoServico { return this.tipo; }
    public getPreco(): number { return this.preco; }
    public getStatus(): StatusServico { return this.status; }

    public concluir(): void {
        this.status = StatusServico.CONCLUIDO;
    }

    public cancelar(): void {
        this.status = StatusServico.CANCELADO;
    }

    public descricao(): string {
        return `${this.tipo} (R$ ${this.preco.toFixed(2)}) - Animal: ${this.animal.getNome()} / Cliente: ${this.cliente.getNome()} [${this.status}]`;
    }
}
