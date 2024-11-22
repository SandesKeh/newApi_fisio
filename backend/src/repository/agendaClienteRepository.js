import con from "./connection.js";


export async function inserirClienteAgenda(cliente) {
    const comando = `
        INSERT INTO db_autonomo_api.tb_cliente_cadastro_agenda(name,cpf, date, time, mode, service)
        VALUES (?, ?, ?,?, ?, ?)
    `;

    const [registro] = await con.query(comando, [
        cliente.name,
        cliente.cpf,
        cliente.date,
        cliente.time,
        cliente.mode,
        cliente.service,
        cliente.status,
    ]);
    
    return registro.insertId; 
}

export async function consultarTodosClientes() {
    const comando = `
SELECT * FROM db_autonomo_api.tb_cliente_cadastro_agenda;
    `;

    const [registros] = await con.query(comando);
    return registros;
}

export async function consultarClientePorId(id) {
    const comando = `
        SELECT * FROM db_autonomo_api.tb_cliente_cadastro_agenda WHERE id = ?;
    `;

    const [registro] = await con.query(comando, [id]);
    return registro; 
}

// Função para consultar a agenda de um cliente pelo CPF
export async function consultarClientePorCPF(cpf) {
  const comando = `
    SELECT * FROM db_autonomo_api.tb_cliente_cadastro_agenda WHERE cpf = ?;
  `;
  
  // Retorna uma Promise que resolve ou rejeita com os resultados ou erro
  return new Promise((resolve, reject) => {
    con.query(comando, [cpf], (err, results) => {
      if (err) {
        // Se ocorrer um erro na consulta ao banco de dados, rejeita a Promise
        reject({ message: 'Erro ao consultar o banco de dados.', details: err });
      }

      if (results.length === 0) {
        // Se não encontrar resultados, rejeita a Promise com uma mensagem de erro
        reject({ message: 'Nenhum evento encontrado para esse CPF' });
      }

      // Caso contrário, resolve a Promise com os resultados encontrados
      resolve(results);
    });
  });
}



export async function atualizarCliente(id, cliente, status) {
    const comando = `
        UPDATE tb_cliente_cadastro_agenda
        SET status =?
        WHERE id= ?;
    `;

    const [resultado] = await con.query(comando, [
        cliente.status,
        id
    ]);
    
    return resultado.affectedRows; 
}

export async function deletarCliente(id) {
    const comando = `
        DELETE FROM tb_cliente_cadastro_agenda WHERE id = ?;
    `;

    const [resultado] = await con.query(comando, [id]);
    return resultado.affectedRows; 
}





