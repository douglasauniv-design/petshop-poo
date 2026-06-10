import Database from "./Database";
import MainController from "./control/MainController";
import AnimalRegister from "./view/AnimalRegister";
import ClienteRegister from "./view/ClienteRegister";
import ServicoRegister from "./view/ServicoRegister";
import FirstScreen from "./view/FirstScreen";

// =============================================================
// Composição / Inversão de Controle (fluxo de controle):
// esta é a camada que monta a árvore de dependências e injeta tudo.
// As views não usam "new": recebem o que precisam pelo construtor.
// (As entidades de domínio são criadas pelo controller; os repositórios,
//  pelo Database. Aqui montamos os componentes do sistema.)
// =============================================================

const database = new Database();
const controller = new MainController(database);

const animalRegister = new AnimalRegister(controller);
const clienteRegister = new ClienteRegister(controller);
const servicoRegister = new ServicoRegister(controller);

const tela = new FirstScreen(controller, animalRegister, clienteRegister, servicoRegister);
tela.iniciar();
