import * as db from '../repository/receitasRepository.js'

import {Router} from 'express';
import { autenticar } from '../utils/jwt.js';


const endpoints = Router();


endpoints.get('/receitas/', autenticar, async (req, resp) =>{
    try {
        let registros = await db.consultarReceitas();
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



endpoints.post('/receitas/', autenticar, async (req, resp) => {
    try {
        let receita = req.body;

        let id = await db.inserirReceitas(receita);

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
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


endpoints.delete('/receitas/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerReceitas(id);
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