import con from './connection.js'



export async function inserirDocumentacao(documentacao) {
    const comando = `
        insert into db_autonomo_api.tb_adicionar_documento(tipo, titulo, conteudo, dt_cadastro)
                                    values(?, ?, ?, ?);
    `;


    let respostas = await con.query(comando, [documentacao.tipo, documentacao.titulo, documentacao.conteudo, documentacao.dataCadastro]);
    let info = respostas[0];


    return info.insertId;
}
export async function inserirDocumentacaoparams(tipo, titulo, conteudo, dataCadastro) {
    const comando = `
        insert into tb_adicionar_profissional (tipo, titulo, conteudo, dataCadastro)
                           values (?,?,?,?);
    `;

    let resposta = await con.query(comando, [tipo, titulo, conteudo, dataCadastro]);

    let info = resposta[0];

    return info.insertId
}


export async function consultarDocumentacao() {
    const comando = `
        select  id_adicionar_documento   id,
                tipo        tipo,
                titulo      titulo,
                conteudo    conteudo,
                dt_cadastro dataCadastro
        from    tb_adicionar_documento;
    `;


    let resposta = await con.query(comando);
    let registros = resposta[0];


    return registros;
}

export async function consultarDocumentoPorId(id ) {
    const comando = `
        select * from tb_adicionar_documento where id_adicionar_documento= ?
 
    `;


    let respostas = await con.query(comando, [id]);
    let registros = respostas[0];
    
    return registros[0];

}



export async function alterarDocumentacao(tipo, titulo, conteudo, dataCadastro,id) {
    const comando = `
        update tb_adicionar_documento
           set  tipo = ?,
                titulo = ?,
                conteudo = ?,
                dt_cadastro = ?
         where  id_adicionar_documento = ?
    `;


    let respostas = await con.query(comando, [tipo, titulo, conteudo, dataCadastro, id]);
    let info = respostas[0];


    return info.affectedRows;
}


export async function removerDocumentacao(id) {
    const comando = `
        delete from db_autonomo_api.tb_adicionar_documento
         where id_adicionar_documento = ?;
    `;


    let respostas = await con.query(comando, [id]);
    let info = respostas[0];


    return info.affectedRows;
}