import { TipoServico } from "../enum/TipoServico";

// Tabela de preços-base de cada serviço (definidos pelo pet shop).
// O preço final cobrado = preço-base x fator do animal.
export default class TabelaPrecos {
    public static precoBase(tipo: TipoServico): number {
        switch (tipo) {
            case TipoServico.BANHO: return 50;
            case TipoServico.TOSA: return 40;
            case TipoServico.CONSULTA: return 120;
            case TipoServico.VACINA: return 80;
            default: return 0;
        }
    }
}
