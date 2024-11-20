import * as bd from '../repository/clienteAgentaRepository.js';
import { Router } from 'express';
import { autenticar } from '../utils/jwt.js';


const endpoint =Router();

endpoint.post('/inserir/agenda', autenticar, async (req,resp) => {
    let clienteObj = req.body;
    clienteObj.idUsuario = req.user.id;


    let registro = await bd.inserirAgenda(clienteObj);

    resp.send({
        id: registro
    })
})

export default endpoint;