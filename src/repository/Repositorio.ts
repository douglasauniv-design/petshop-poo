// Repositório GENÉRICO: funciona com qualquer tipo T.
// Concentra a lógica de persistência (em memória), busca e ordenação.
export default class Repositorio<T> {
    private itens: T[] = [];

    public adicionar(item: T): void {
        this.itens.push(item);
    }

    public listar(): T[] {
        return [...this.itens];
    }

    public obter(indice: number): T | undefined {
        return this.itens[indice];
    }

    public get tamanho(): number {
        return this.itens.length;
    }

    // Busca genérica: recebe um critério e devolve os itens que casam.
    public buscar(criterio: (item: T) => boolean): T[] {
        return this.itens.filter(criterio);
    }

    // Ordenação genérica: recebe a regra de comparação.
    public ordenar(comparador: (a: T, b: T) => number): T[] {
        return [...this.itens].sort(comparador);
    }
}
