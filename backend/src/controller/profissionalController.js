import * as db from '../repository/profissionalRepository.js'

import {Router} from 'express';
const endpoints = Router();



endpoints.get('/usuario/profissional', async (req, resp) =>{
    try {
        let registros = await db.consultarProfissional();
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/consultar/usuario/profissional/:id', async (req, resp) =>{
    try {
        let id = req.params.id;
        let registros = await db.consultarProfissionalPorId(id);
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



endpoints.post('/inseir/usuario/profissional/:nome/:email/:acesso', async (req, resp) => {
    try {
        let {nome, email, acesso} = req.params;

        let id = await db.inserirProfissional(nome, email, acesso);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.put('/update/profissional/:nome/:email/:acesso/:id', async (req, resp) =>{
    let {nome, email, acesso, id} = req.params;
    let comando = await db.alterarProfissional(nome, email, acesso, id);
    resp.send({mensagem: "update com sucesso"})
})


endpoints.delete('/usuario/profissional:id', async (req, resp) => {
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