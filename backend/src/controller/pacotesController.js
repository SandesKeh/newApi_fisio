import * as db  from '../repository/pacotesRepository.js';
import { Router } from 'express';
import { autenticar } from '../utils/jwt.js';

const endpoint = Router();

endpoint.post('/insert/pacotes/:nome/:valor', autenticar, async (req,resp) => {
    try{
        let {nome, valor} = req.params;
        nome.idUsuario = req.user.id;
        valor.idUsuario = req.user.id;
    
        let id = await db.inserirPacotes(nome, valor);

        resp.send({
            id: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
        
})


endpoint.get('/consultar/pacotes', autenticar, async (req,resp) => {
    try {
        let o = await db.consultarPacotes()

        resp.send(o)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
        
})
endpoint.get('/consultar/pacote/:id', autenticar, async (req, resp) =>{
    try {
        let id = req.params.id;
        let registros = await db.consultarPacotesPorId(id);
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoint.put('/update/pacotes/:nome/:valor/:id', autenticar, async (req, resp) =>{
    let {nome, valor, id} = req.params;
    let comando = await db.alterarPacotes(nome, valor, id);
    resp.send({mensagem: "update com sucesso"})
})

endpoint.put('/alterar/pacotes/:id', autenticar, async (req, resp) => {
    try {
        let pacoteOjs = req.body;
        let i = req.params;

        //let respost = await db.alterarPacotes(pacoteOjs, i);

        if (respost = undefined ) {
            resp.send({
                resposta: "alterado com sucesso "   
            })
        }
        else {
            resp.status(404).send({erro: "Nenhum pacote encontrado"})
        }
           
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
     
})


endpoint.delete('/deletar/pacote/:id', autenticar, async (req, resp) =>{
    try {
        let id = req.params.id;

        let respot = await db.deletarPacotes(id);
        if (respot = undefined ) {
            resp.send({
                respota: "deletado com sucesso"
            })
        }
        else{
            resp.status(404).send({erro: "Nenhum pacote encontrado"})
        }
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
      
})
export default endpoint;