import * as db from '../repository/documentacaoRepository.js'

import {Router} from 'express';
const endpoints = Router();


endpoints.get('/documentacao/', async (req, resp) =>{
    try {
        let registros = await db.consultarDocumentacao();
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/consultar/usuario/documento/:id', async (req, resp) =>{
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



endpoints.post('/documentacao/', async (req, resp) => {
    try {
        let documentacao = req.body;

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

endpoints.put('/update/documento/:tipo/:titulo/:conteudo/:dataCadastro/:id', async (req, resp) =>{
    let {tipo, titulo, conteudo, dataCadastro, id} = req.params;

    let comando = await db.alterarDocumentacao(tipo, titulo, conteudo, dataCadastro, id);

    resp.send({mensagem: "update com sucesso"})
})


endpoints.delete('/documentacao/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerInventario(id);
            if (linhasAfetadas >= 1) {
                resp.send();
            } else {
                resp.status(404).send({erro: 'Nenhum inventario encontrado'});
            }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})
export default endpoints;