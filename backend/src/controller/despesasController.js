import * as db from '../repository/despesasRepository.js'

import {Router} from 'express';
import { autenticar } from '../utils/jwt.js';


const endpoints = Router();


endpoints.get('/despesas/', autenticar, async (req, resp) =>{
    try {
        let registros = await db.consultarDespesas();
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



endpoints.post('/inserir/despesas/', autenticar, async (req, resp) => {
    try {
        let despesa = req.body;
        despesa.idUsuario = req.user.id;
        let id = await db.inserirDespesas(despesa);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/consultar/despesas/:id', autenticar, async (req, resp) =>{
    try {
        let id = req.params.id;
        let registros = await db.consultarDespesaPorId(id);
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/update/despesas/:propriedade/:categoriaFinanceira/:descricao/:valor/:dataPagamento/:id', autenticar, async (req, resp) =>{
    let {propriedade, categoriaFinanceira , descricao, valor, dataPagamento, id} = req.params;
    let comando = await db.alterarDespesas(propriedade, categoriaFinanceira, descricao, valor, dataPagamento, id);
    resp.send({mensagem: "update com sucesso"});
})

endpoints.put('/despesas/:id', autenticar, async (req, resp) => {
    try{
        let id = req.params.id;
        let despesa = req.body;

        let linhasAfetadas = await db.alterarDespesas(id, despesa);
        if (linhasAfetadas >= 1) {
            resp.send();
        } else {
            resp.status(404).send({erro: 'Nenhum inventario encontrado'})
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.delete('/despesas/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerDespesas(id);
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