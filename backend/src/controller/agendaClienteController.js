import * as bd from "../repository/agendaClienteRepository.js";
import { Router } from "express";
import { autenticar } from "../utils/jwt.js";


const endpoint = Router();

endpoint.post('/inserir/agendaCliente', autenticar, async (req, resp) => {
    try {
        const cliente = req.body;
        cliente.idUsuario = req.user.id;

        const registro = await bd.inserirClienteAgenda(cliente);
        resp.send({ novoId: registro });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoint.get('/consulta/agendaCliente', autenticar, async (req, resp) => {
    try {
        const registro = await bd.consultarTodosClientes();
        resp.send(registro);
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});



// Endpoint para consultar a agenda do cliente com base no CPF
endpoint.get('/consulta/agendaClienteCPF/:cpf', autenticar, async (req, res) => {
    try {
      const cpf = req.params.cpf;  // CPF passado pela URL
      // Chama o repository para consultar a agenda do cliente
      const registro = await bd.consultarClientePorCPF(cpf);
  
      // Se não encontrar nenhum registro, retorna um erro 404
      if (!registro || registro.length === 0) {
        return res.status(404).send({ erro: 'Não foram encontrados eventos para esse CPF.' });
      }
  
      // Se encontrar o registro, retorna ele
      res.send(registro);
    } catch (err) {
      // Se houver erro no processo, retorna o erro com código 500
      res.status(500).send({ erro: 'Erro ao consultar a agenda do cliente. Tente novamente mais tarde.' });
    }
  });
endpoint.put('/atualizar/agendaCliente/:id', autenticar, async (req, resp) => { 
    try {
        const id = req.params.id;
        const cliente = req.body;

        const agendaExiste = await bd.consultarClientePorId(id);
        if (!agendaExiste.length) {
            return resp.status(404).send({ resposta: "Agenda não encontrada..." });
        }

        const linhasAfetadas = await bd.atualizarCliente(id, cliente); 
        if (linhasAfetadas === 0) {
            return resp.status(500).send({ resposta: "Nenhum registro encontrado..." });
        } else {
            return resp.send({ resposta: "Atualizado com sucesso!" });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoint.delete('/deleta/agendaCliente/:id', autenticar, async (req, resp) => {
    try {
        const id = req.params.id;

        const agendaExiste = await bd.consultarClientePorId(id);
        if (!agendaExiste.length) {
            return resp.status(404).send({ resposta: "Agenda não encontrada..." });
        }

        const linhasAfetadas = await bd.deletarCliente(id); 
        if (linhasAfetadas === 0) {
            return resp.status(500).send({ resposta: "Nenhum registro encontrado..." });
        } else {
            return resp.send({ resposta: "Removido com sucesso!" });
        }
    } catch (err) {
        return resp.status(400).send({ erro: err.message });
    }
});


export default endpoint;
