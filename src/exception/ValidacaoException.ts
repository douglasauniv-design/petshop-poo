// Exceção personalizada para erros de validação de dados.
export default class ValidacaoException extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "ValidacaoException";
    }
}
