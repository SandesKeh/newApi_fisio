import con from './connection.js'



export async function inserirDespesas(despesa) {
    const comando = `
        insert into db_autonomo_api.tb_adicionar_despesa(propriedade, categoria_financeira, descricao, valor, data_pagamento)
                                    values(?, ?, ?, ?, ?);
    `;


    let respostas = await con.query(comando, [despesa.propriedade, despesa.categoriaFinanceira, despesa.descricao, despesa.valor, , despesa.dataPagamento]);
    let info = respostas[0];


    return info.insertId;
}


export async function consultarDespesas() {
    const comando = `
        select  propriedade             propriedade, 
                categoria_financeira    categoriaFinanceira,
                descricao               descricao,
                valor                   valor,
                data_pagamento          dataPagamento
        from    db_autonomo_api.tb_adicionar_despesa;
    `;


    let resposta = await con.query(comando);
    let registros = resposta[0];


    return registros;
}


export async function alterarDespesas(id) {
    const comando = `
        update from db_autonomo_api.tb_adicionar_despesa
           set  propriedade = ?, 
                categoria_financeira = ?,
                descricao = ?,
                valor = ?,
                data_pagamento = ?
         where  id_adicionar_despesa = ?;
    `;


    let respostas = await con.query(comando, [despesa.propriedade, despesa.categoriaFinanceira, despesa.descricao, despesa.valor,  despesa.dataPagamento,  id]);
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