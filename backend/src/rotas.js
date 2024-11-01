import agendaClienteController from './controller/agendaClienteController.js';
import agendaPessoalController from './controller/agendaPessoalController.js';
import clienteAgendaController from './controller/clienteAgentaController.js';
import despesasController from './controller/despesasController.js';
import documentacaoController from './controller/documentacaoController.js';
import enderecoController from './controller/enderecoController.js';
import infoFinanceiraController from './controller/infoFinanceiraController.js';
import informacoesPessoaisController from  './controller/informacoesPessoaisController.js';
import inventarioController from './controller/inventarioController.js';
import notificacaoController from './controller/notificacaoController.js';
import pacotesController from './controller/pacotesController.js';
import profissionalController from './controller/profissionalController.js';
import receitasController from './controller/receitasController.js';
import responsavelController from './controller/responsavelController.js';
import usuarioCliente from './controller/userClienteController.js';
import usuarioController from './controller/userController.js';







export default function adicionarRotas(servidor) {
    servidor.use(agendaClienteController);
    servidor.use(agendaPessoalController);
    servidor.use(clienteAgendaController);
    servidor.use(despesasController);
    servidor.use(documentacaoController);
    servidor.use(enderecoController);
    servidor.use(infoFinanceiraController);
    servidor.use(informacoesPessoaisController);
    servidor.use(inventarioController);
    servidor.use(notificacaoController);
    servidor.use(pacotesController);
    servidor.use(profissionalController);
    servidor.use(receitasController);
    servidor.use(responsavelController);
    servidor.use(usuarioCliente);
    servidor.use(usuarioController);
    
}