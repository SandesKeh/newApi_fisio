import con from './connection.js';

export async function inserirUsuarioCliente(cliente) {
    const comando = `
        insert into tb_login_cliente (cpf, senha) 
                        values (?, ?)
    `;


    let resposta = await con.query(comando, [cliente.cpf, cliente.senha])
    let info = resposta[0];


    return info.insertId;
}
   

export async function validarUsuarioCliente(cliente) {
    const comando = `
    select id_login_cliente,
    cpf
    from tb_login_cliente 
    where cpf = ? and senha = ?
    `;

    let registros = await con.query(comando, [cliente.cpf, cliente.senha])
    return registros[0][0];

}

