// Interface usada para polimorfismo: tudo que "sabe se descrever".
// Animal, Cliente e Servico implementam esta interface.
export default interface Descritivel {
    descricao(): string;
}
