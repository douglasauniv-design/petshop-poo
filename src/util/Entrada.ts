import promptSync from "prompt-sync";

// Centraliza a leitura do teclado COM validação. Boa prática: evita repetir
// parseInt/parseFloat em cada view e impede entradas inválidas
// (vazio, fora da faixa, texto onde se espera número, etc.).
export default class Entrada {
    private static prompt = promptSync();

    // Texto não vazio.
    public static texto(mensagem: string): string {
        let valor = Entrada.prompt(mensagem).trim();
        while (valor.length === 0) {
            console.log("  > Valor não pode ser vazio.");
            valor = Entrada.prompt(mensagem).trim();
        }
        return valor;
    }

    // Inteiro dentro de uma faixa [min, max]. Só sai do laço com valor válido.
    public static inteiro(mensagem: string, min: number, max: number): number {
        while (true) {
            const valor = parseInt(Entrada.prompt(mensagem));
            if (!isNaN(valor) && valor >= min && valor <= max) {
                return valor;
            }
            console.log(`  > Digite um número inteiro entre ${min} e ${max}.`);
        }
    }

    // Número (aceita vírgula como separador decimal, ex.: 2,5) >= min.
    public static numero(mensagem: string, min: number): number {
        while (true) {
            const texto = Entrada.prompt(mensagem).replace(",", ".");
            const valor = parseFloat(texto);
            if (!isNaN(valor) && valor >= min) {
                return valor;
            }
            console.log(`  > Digite um número válido (mínimo ${min}).`);
        }
    }

    // Pergunta sim/não, devolve boolean.
    public static simNao(mensagem: string): boolean {
        let valor = Entrada.prompt(mensagem + " (s/n): ").trim().toLowerCase();
        while (valor !== "s" && valor !== "n") {
            console.log("  > Responda com 's' ou 'n'.");
            valor = Entrada.prompt(mensagem + " (s/n): ").trim().toLowerCase();
        }
        return valor === "s";
    }

    // Mostra opções numeradas e devolve o índice (0-based) escolhido.
    // Só aceita um número correspondente a uma das opções.
    public static opcao(mensagem: string, opcoes: string[]): number {
        if (mensagem.length > 0) {
            console.log(mensagem);
        }
        opcoes.forEach((op, i) => console.log(`  ${i + 1}. ${op}`));
        return Entrada.inteiro("Escolha: ", 1, opcoes.length) - 1;
    }
}
