import Animal from "./model/Animal";
import Cliente from "./model/Cliente";
import Servico from "./model/Servico";
import Repositorio from "./repository/Repositorio";

// Armazenamento temporário dos objetos do sistema.
// Cada coleção é um Repositorio genérico.
export default class Database {
    private animais: Repositorio<Animal> = new Repositorio<Animal>();
    private clientes: Repositorio<Cliente> = new Repositorio<Cliente>();
    private servicos: Repositorio<Servico> = new Repositorio<Servico>();

    public getAnimais(): Repositorio<Animal> { return this.animais; }
    public getClientes(): Repositorio<Cliente> { return this.clientes; }
    public getServicos(): Repositorio<Servico> { return this.servicos; }
}
