import con from './connection.js'



export async function inserirDespesas(despesa) {
    const comando = `
        insert into tb_adicionar_despesa(propriedade, categoria_financeira, descricao, valor, data_pagamento)
                                    values(?, ?, ?, ?, ?);
    `;


    let respostas = await con.query(comando, [despesa.propriedade, despesa.categoriaFinanceira, despesa.descricao, despesa.valor,  despesa.dataPagamento]);
    let info = respostas[0];


    return info.insertId;
}


export async function consultarDespesas() {
    const comando = `
        select  *  from  tb_adicionar_despesa;
    `;


    let resposta = await con.query(comando);
    let registros = resposta[0];


    return registros;
}

export async function consultarDespesaPorId(id ) {
    const comando = `
        select * from tb_adicionar_despesa where id_adicionar_despesa= ?
    `;


    let respostas = await con.query(comando, [id]);
    let registros = respostas[0];
    
    return registros[0];

}

export async function alterarDespesas(propriedade, categoriaFinanceira, descricao, valor, dataPagamento, id) {
    const comando = `
        update tb_adicionar_despesa
           set  propriedade = ?, 
                categoria_financeira = ?,
                descricao = ?,
                valor = ?,
                data_pagamento = ?
         where  id_adicionar_despesa = ?
    `;


    let respostas = await con.query(comando, [propriedade, categoriaFinanceira, descricao, valor,  dataPagamento,  id]);
    let info = respostas[0];


    return info.affectedRows;
}


export async function removerDespesas(id) {
    const comando = `
        delete from db_autonomo_api.tb_adicionar_despesa
         where id_adicionar_despesa = ?;
    `;


    let respostas = await con.query(comando, [id]);
    let info = respostas[0];


    return info.affectedRows;
}