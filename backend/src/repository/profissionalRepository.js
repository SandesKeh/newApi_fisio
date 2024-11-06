import con from "./connection.js";



export async function inserirProfissional(nome, email, acesso) {
    const comando = `
        insert into tb_adicionar_profissional (nome, email, acesso)
                           values (?,?,?);
    `;

    let resposta = await con.query(comando, [nome, email, acesso]);

    let info = resposta[0];

    return info.insertId
}


export async function consultarProfissional() {
    const comando = `
        select * from tb_adicionar_profissional;
    `;


    let respostas = await con.query(comando);
    let registros = respostas[0];
    
    return registros;

}


export async function alterarProfissional(id, profissional) {
    const comando = `
        update  db_autonomo_api.tb_adicionar_profissional 
           set  nome = ?,
                email = ?,
                acesso = ?,
         where  id_adicionar_profissional = ?;
    `;

    
    let respostas = await con.query(comando, [profissional.nome, profissional.email, profissional.temAcesso, id]);
    let info = respostas[0];

    return info.affectedRows;
}


export async function removerInventario(id) {
    const comando = `
        delete from db_autonomo_api.tb_adicionar_profissional
         where id_adicionar_profissional = ?;
    `;


    let respostas = await con.query(comando, [id]);
    let info = respostas[0];


    return info.affectedRows;
}
