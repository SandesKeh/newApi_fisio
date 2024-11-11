import * as db from '../repository/inventarioRepository.js'

import {Router} from 'express';
const endpoints = Router();



endpoints.get('/inventario/', async (req, resp) =>{
    try {
        let registros = await db.consultarInventario();
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



endpoints.post('/inserir/inventario/:produto/:categoria/:estoque/:local/:precoUnitario/:valorTotal/:data', async (req, resp) => {
    try {

        let { produto, categoria, estoque, local, precoUnitario, valorTotal, data } = req.params;

        let id = await db.inserirInventario(produto, categoria, estoque, local, precoUnitario, valorTotal, data);

        resp.send({
            novoId: id
        });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});



endpoints.put('/atualizar/inventario/:produto/:categoria/:estoque/:local/:precoUnitario/:valorTotal/:data/:id', async (req, resp) => {
    try{
        let { produto, categoria, estoque, local, precoUnitario, valorTotal, data, id } = req.params;
        

        let linhasAfetadas = await db.alterarInventario(produto, categoria, estoque, local, precoUnitario, valorTotal, data, id );
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


endpoints.delete('/deletar/inventario/:id', async (req, resp) => {
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