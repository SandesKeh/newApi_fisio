import * as bd from "../repository/notificacaoRepository.js"; 
import { Router } from "express";
import { autenticar } from "../utils/jwt.js";


const endpoint = Router();


endpoint.post('/inserir/notificacao', autenticar, async (req, resp) => {
    try {
        let notificacao = req.body;
        notificacao.idUsuario = req.user.id;
        let registro = await bd.inserirNotificacao(notificacao);
        resp.send({
            novoId: registro
        });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoint.get('/consulta/notificacoes', autenticar, async (req, resp) => {
    try {
        let registros = await bd.consultarTodasNotificacoes();
        resp.send(registros);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoint.get('/consulta/notificacao/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let notificacao = await bd.consultarNotificacaoPorId(id);
        if (!notificacao) {
            return resp.status(404).send({
                resposta: "Notificação não encontrada..."
            });
        }
        resp.send(notificacao);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoint.put('/atualizar/notificacao/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let notificacao = req.body;

        let notificacaoExiste = await bd.consultarNotificacaoPorId(id);
        if (!notificacaoExiste) {
            return resp.status(404).send({
                resposta: "Notificação não encontrada..."
            });
        }

        let linhasAfetadas = await bd.atualizarNotificacao(id, notificacao);
        if (linhasAfetadas === 0) {
            return resp.status(500).send({
                resposta: "Erro ao atualizar notificação..."
            });
        } else {
            return resp.send({ resposta: "Notificação atualizada com sucesso!" });
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoint.delete('/deleta/notificacao/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let notificacaoExiste = await bd.consultarNotificacaoPorId(id);
        if (!notificacaoExiste) {
            return resp.status(404).send({
                resposta: "Notificação não encontrada..."
            });
        }

        let linhasAfetadas = await bd.deletarNotificacao(id);
        if (linhasAfetadas === 0) {
            return resp.status(500).send({
                resposta: "Erro ao remover notificação..."
            });
        } else {
            return resp.send({ resposta: "Notificação removida com sucesso!" });
        }
    } catch (err) {
        return resp.status(400).send({
            erro: err.message
        });
    }
});

export default endpoint;
