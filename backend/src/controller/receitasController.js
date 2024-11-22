import * as db from '../repository/receitasRepository.js'

import {Router} from 'express';
import { autenticar } from '../utils/jwt.js';


const endpoints = Router();


endpoints.get('/consultar/receitas/', autenticar, async (req, resp) =>{
    try {
        let registros = await db.consultarReceitas();
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.get('/consultar/receitas/:id', autenticar, async (req, resp) =>{
    try {
        let id = req.params.id;
        let registros = await db.consultarReceitaPorId(id);
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});


endpoints.post('/inserir/receitas/', autenticar, async (req, resp) => {
    try {
        let receita = req.body;
        receita.idUsuario = req.user.id;

        let id = await db.inserirReceitas(receita);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});


endpoints.put('/update/receitas/:propriedade/:categoriaFinanceira/:descricao/:valor/:dataPagamento/:id', autenticar, async (req, resp) =>{
    let {propriedade, categoriaFinanceira , descricao, valor, dataPagamento, id} = req.params;
    let comando = await db.alterarDespesas(propriedade, categoriaFinanceira, descricao, valor, dataPagamento, id);
    resp.send({mensagem: "update com sucesso"});
})


endpoints.put('/receitas/:id', autenticar, async (req, resp) => {
    try{
        let id = req.params.id;
        let receita = req.body;

        let linhasAfetadas = await db.alterarReceitas(id, receita);
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


endpoints.delete('/deletar/receitas/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerDespesas(id);
            if (linhasAfetadas >= 1) {
                resp.send({ mensagem: 'Despesa excluída com sucesso' });
            } else {
                resp.status(404).send({ erro: 'Nenhuma despesa encontrada' });
            }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


export default endpoints;