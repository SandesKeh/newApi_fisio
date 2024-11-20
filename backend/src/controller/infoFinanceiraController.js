import * as db from '../repository/infoFinanceiraRepository.js'
import { Router } from 'express';
import { autenticar } from '../utils/jwt.js';

const endpoint= Router();

endpoint.post('/inserir/financeiro', autenticar, async (req,resp) => {
    try {
        
        let financeiroObj = req.body;
        financeiroObj.idUsuario = req.user.id;

        let id = await db.inserirFinanceiro(financeiroObj);

        resp.send({
            id: id
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
        
})

endpoint.get('/consultar/financeiro', autenticar, async (req,resp) =>{
    try {
        let registro = await db.consultarFinanceiro();
        resp.send(registro);
    }
    
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoint.put('/alterar/financeiro/:id', autenticar, async (req,resp) => {
    try {
        let financeiroObj= req.body;
        let id = req.params.id;

        let respi = await db.alterarFinanceiro(financeiroObj, id);
        if (respi === undefined) {
            resp.send({ 
                resposta: 'Alterado com sucesso' 
            });
        } else {
            resp.status(404).send({ 
                erro: 'Nenhuma informação financeira encontrada' 
            });
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
        

    
})

endpoint.delete('/deletar/financeiro/:id', autenticar, async (req,resp) => {
    try {
        let id = req.params.id;

        let registro= await db.deletarFinanceiro(id);
        if (registro === undefined) {
            resp.send({ 
                resposta: 'Removido com sucesso' 
            });
        } else {
            resp.status(404).send({ 
                erro: 'Nenhuma informação financeira encontrada' 
            });
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
        

})



export default endpoint;