import * as bd from "../repository/agendaClienteRepository.js";
import { Router } from "express";

const endpoint = Router();

endpoint.post('/inserir/agendaCliente', async (req, resp) => {
    try {
        const cliente = req.body;
        const registro = await bd.inserirClienteAgenda(cliente);
        resp.send({ novoId: registro });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoint.get('/consulta/agendaCliente', async (req, resp) => {
    try {
        const registro = await bd.consultarTodosClientes();
        resp.send(registro);
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});

endpoint.put('/atualizar/agendaCliente/:id', async (req, resp) => { 
    try {
        const id = req.params.id;
        const cliente = req.body;

        const agendaExiste = await bd.consultarClientePorId(id);
        if (!agendaExiste.length) {
            return resp.status(404).send({ resposta: "Agenda não encontrada..." });
        }

        const linhasAfetadas = await bd.atualizarCliente(id, cliente); 
        if (linhasAfetadas === 0) {
            return resp.status(500).send({ resposta: "Nenhum registro encontrado..." });
        } else {
            return resp.send({ resposta: "Atualizado com sucesso!" });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoint.delete('/deleta/agendaCliente/:id', async (req, resp) => {
    try {
        const id = req.params.id;

        const agendaExiste = await bd.consultarClientePorId(id);
        if (!agendaExiste.length) {
            return resp.status(404).send({ resposta: "Agenda não encontrada..." });
        }

        const linhasAfetadas = await bd.deletarCliente(id); 
        if (linhasAfetadas === 0) {
            return resp.status(500).send({ resposta: "Nenhum registro encontrado..." });
        } else {
            return resp.send({ resposta: "Removido com sucesso!" });
        }
    } catch (err) {
        return resp.status(400).send({ erro: err.message });
    }
});

export default endpoint;
