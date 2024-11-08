import con from "./connection.js";

export async function inserirClienteAgenda(cliente) {
    const comando = `
        INSERT INTO tb_cliente_cadastro_agenda(name, date, time, retun, mode, service)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [registro] = await con.query(comando, [
        cliente.name,
        cliente.date,
        cliente.time,
        cliente.retun,
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
        SELECT * FROM tb_cliente_cadastro_agenda WHERE id = ?;
    `;

    const [registro] = await con.query(comando, [id]);
    return registro; 
}

export async function atualizarCliente(id, cliente,status) {
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
