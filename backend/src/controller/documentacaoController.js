import * as db from '../repository/documentacaoRepository.js'

import {Router} from 'express';
import { autenticar } from '../utils/jwt.js';


const endpoints = Router();


endpoints.get('/documentacao/', autenticar, async (req, resp) =>{
    try {
        let registros = await db.consultarDocumentacao();
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/consultar/usuario/documento/:id', autenticar, async (req, resp) =>{
    try {
        let id = req.params.id;
        let registros = await db.consultarDocumentoPorId(id);
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



endpoints.post('/documentacao/', autenticar, async (req, resp) => {
    try {
        let documentacao = req.body;
        documentacao.idUsuario = req.user.id;


        let id = await db.inserirDocumentacao(documentacao);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/inseir/documento/:tipo/:titulo/:conteudo/:dataCadastro', autenticar, async (req, resp) => {
    try {
        let {tipo, titulo, conteudo, dataCadastro} = req.params;
        let idUsuario = req.user.id;

        let id = await db.inserirDocumentacaoparams(tipo, titulo, conteudo, dataCadastro);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/update/documento/:tipo/:titulo/:conteudo/:dataCadastro/:id', autenticar, async (req, resp) =>{
    let {tipo, titulo, conteudo, dataCadastro, id} = req.params;

    let comando = await db.alterarDocumentacao(tipo, titulo, conteudo, dataCadastro, id);

    resp.send({mensagem: "update com sucesso"})
})


endpoints.delete('/deletar/documentacao/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerDocumentacao(id);
            if (linhasAfetadas >= 1) {
                resp.send({ resposta: 'Removido com sucesso' });
            } else {
                resp.status(404).send({erro: 'Documento não encontrado' });
            }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})
export default endpoints;