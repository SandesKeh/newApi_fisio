import con from "./connection.js";

export async function inserirClienteAgenda(cliente) {
    const comando = `
        INSERT INTO tb_cliente_cadastro_agenda(nome, data, horario, repetir, modo, servico)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [registro] = await con.query(comando, [
        cliente.name,
        cliente.date,
        cliente.time,
        cliente.repeat,
        cliente.mode,
        cliente.service,
    ]);
    
    return registro.insertId; 
}

export async function consultarTodosClientes() {
    const comando = `
        SELECT * FROM tb_cliente_cadastro_agenda;
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
        SET nome = ?, data = ?, horario = ?, repetir = ?, modo = ?, servico = ?, status =?
        WHERE id= ?;
    `;

    const [resultado] = await con.query(comando, [
        cliente.name,
        cliente.date,
        cliente.time,
        cliente.repeat,
        cliente.mode,
        cliente.service,
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
