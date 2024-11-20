import * as db from '../repository/userRepository.js'

import { Router } from 'express';
import { gerarToken } from "../utils/jwt.js";

const endpoints = Router();


endpoints.post('/login/', async (req, resp) => {
    try {
        let pessoa = req.body;

        let autonomo = await db.validarUsuario(pessoa);

        if (autonomo == null) {
            return resp.status(401).send({ erro: "Usuário ou senha incorreto(s)" });
        }
        else {
            let chaveToken = gerarToken(autonomo);
            resp.send({
                "token": chaveToken
            });
        }
    } catch (err) {
        console.error(err);
        resp.status(500).send({ erro: 'Erro interno do servidor.' });
    }
})



endpoints.post('/usuario/', async (req, resp) => {
    try {
        let pessoa = req.body;

        let id = await db.inserirUsuario(pessoa);

        resp.send({
            novoId: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})
export default endpoints;