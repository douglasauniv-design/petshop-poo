# Pet Shop — Sistema de Gerenciamento (POO / TypeScript)

Sistema de console para gerenciar um pet shop, desenvolvido em TypeScript
seguindo o paradigma de Orientação a Objetos.

## Como rodar

```bash
npm install        # instala as dependências
npm start          # executa o sistema (terminal interativo)
npm test           # roda os testes unitários (Jest)
npm run build      # compila para a pasta dist/
```

## Estrutura (MVC)

```
src/
├── index.ts                  # Composição/IoC: ÚNICO lugar com "new"
├── Database.ts               # Armazenamento (Repositorios privados + getters)
├── repository/
│   └── Repositorio.ts        # Repositório GENÉRICO: persistência, busca, ordenação
├── enum/
│   ├── PorteAnimal.ts
│   ├── TipoPelagem.ts
│   ├── TipoAgua.ts
│   ├── TipoServico.ts
│   └── StatusServico.ts
├── interface/
│   └── Descritivel.ts        # Interface (polimorfismo)
├── exception/
│   └── ValidacaoException.ts # Exceção personalizada
├── model/
│   ├── Animal.ts             # Classe ABSTRATA (métodos abstratos + dono)
│   ├── Mamifero.ts           # Abstrata intermediária (pelagem)
│   ├── Cachorro.ts           # \
│   ├── Gato.ts               #  > herdam de Mamifero
│   ├── Coelho.ts             # /
│   ├── Reptil.ts             # Abstrata intermediária (temperatura)
│   ├── Lagarto.ts            # \  herdam de Reptil
│   ├── Tartaruga.ts          # /
│   ├── Ave.ts                # herda direto de Animal
│   ├── Peixe.ts              # herda direto de Animal
│   ├── Cliente.ts            # dono de vários Animais (associação bidirecional)
│   ├── Servico.ts            # associa Cliente + Animal, com status
│   └── TabelaPrecos.ts       # preços-base fixos dos serviços
├── control/
│   └── MainController.ts     # regras de negócio (recebe Database por injeção)
├── view/
│   ├── FirstScreen.ts        # menu principal + relatório
│   ├── AnimalRegister.ts     # SEM "new"
│   ├── ClienteRegister.ts    # SEM "new"
│   └── ServicoRegister.ts    # SEM "new"
└── util/
    └── Entrada.ts            # leitura de teclado com validação
tests/
└── MainController.test.ts    # testes unitários
```

## Hierarquia de animais

```
Animal (abstrata)
├── Mamifero (abstrata: pelagem | serviços: banho, tosa, consulta, vacina)
│   ├── Cachorro  (porte, adestrado)
│   ├── Gato      (castrado)
│   └── Coelho    (vacinado)
├── Reptil (abstrata: temperaturaIdeal | serviços: consulta, vacina)
│   ├── Lagarto   (tamanhoCm)
│   └── Tartaruga (aquatica)
├── Ave   (voa | serviços: banho, consulta, vacina)
└── Peixe (tipoAgua | serviços: consulta)
```

## Regras de domínio (coerência)

- Cada animal pode ter **apenas um dono**. Ao vincular, o animal passa a
  conhecer seu cliente (associação bidirecional).
- Um serviço só pode ser agendado para um **animal do próprio cliente**.
- Cada animal só aceita os serviços que fazem sentido (`servicosDisponiveis`):
  peixe não toma banho, réptil não faz tosa, etc.
- Um serviço tem status (Agendado → Concluído / Cancelado); cancelados não
  entram no faturamento. Previsto = agendados; realizado = concluídos.

## Por que não há "new" nas views

As views recebem o `MainController` (e suas dependências) pelo construtor.
Quem instancia os objetos é o `index.ts`, a camada de composição —
o "fluxo de controle" citado no material de Injeção de Dependências.
Quando a view precisa criar um modelo, ela envia os dados ao controller,
e o controller faz o `new`.

## Boas práticas e inovação

- **Classes abstratas intermediárias** (`Mamifero`, `Reptil`): concentram
  atributos e serviços comuns, evitando repetição (DRY).
- **`cuidadosRecomendados()`**: método polimórfico — cada animal devolve uma
  dica de cuidado, exibida após o cadastro.
- **Preço polimórfico**: `TabelaPrecos` define o preço-base fixo e cada animal
  define seu `fatorServico()`; preço final = base × fator.
- **Status de serviço** + relatório com faturamento previsto, realizado,
  valor médio por serviço, serviço mais procurado e faturamento por tipo.
- **Entrada validada (`util/Entrada`)**: recusa vazio, valida faixas de número,
  aceita vírgula como decimal e usa menus numerados com opções válidas.
- **Encapsulamento**: todos os atributos privados, com getters; `Database`
  expõe os repositórios apenas por métodos.

## Requisitos atendidos

| Requisito                              | Onde está                                                        |
|----------------------------------------|------------------------------------------------------------------|
| Classificação / associação             | `Cliente` ↔ `Animal` (bidirecional), `Servico` ↔ `Cliente`+`Animal` |
| Herança (dois níveis)                  | `Cachorro`/`Gato`/`Coelho` → `Mamifero`; `Lagarto`/`Tartaruga` → `Reptil` → `Animal` |
| MVC via controller                     | `view/` → `MainController` → `model/`                            |
| Injeção de Dependência                 | `MainController(database)`; views recebem deps; `index.ts` injeta |
| Enum                                   | `PorteAnimal`, `TipoPelagem`, `TipoAgua`, `TipoServico`, `StatusServico` |
| Sobrescrita                            | `descricao()`, `cuidadosRecomendados()`, `fatorServico()`        |
| Sobrecarga                             | `MainController.buscarAnimal(string)` / `(number)`               |
| Classe abstrata                        | `Animal`, `Mamifero`, `Reptil`                                   |
| Interface / polimorfismo               | `Descritivel`; serviços e preço definidos por cada animal        |
| try-catch + exceção personalizada      | `ValidacaoException` lançada no controller, capturada nas views  |
| Testes unitários (Jest)                | `tests/MainController.test.ts` (19 testes)                       |
| Tipos genéricos                        | `Repositorio<T>`                                                 |
| Persistência + busca/ordenação         | `Repositorio.buscar()` e `Repositorio.ordenar()`                |
| Inovação / boas práticas               | preço polimórfico, status/relatório, entrada validada, encapsulamento |
