import con from "./connection.js";



export async function inserirInventario(produto, categoria, estoque, local, precoUnitario, valorTotal, data) {
    const comando = `
        insert into tb_inventario (nome_produto, categoria, qts_estoque, onde_comprou, preco_unitario, valor_total, data_compra)
                           values (?, ?, ?, ?, ?, ?, ?);
    `;

    let resposta = await con.query(comando, [produto, categoria, estoque, local, precoUnitario, valorTotal, data]);

    let info = resposta[0];

    return info.insertId;
}



export async function consultarInventario() {
    const comando = `
       select*from tb_inventario;
    `;


    let respostas = await con.query(comando);
    let registros = respostas[0];
    
    return registros

}


export async function alterarInventario(id, inventario) {
    const comando = `
        update  db_autonomo_api.tb_inventario 
           set  nome_produto = ?,
                categoria = ?,
                qts_estoque = ?,
                onde_comprou = ?,
                preco_unitario = ?, 
                valor_total = ?,
                data_compra = ?
         where  id_inventario = ?;
    `;

    
    let respostas = await con.query(comando, [inventario.produto, inventario.categoria, inventario.estoque, inventario.local, inventario.precoUnitario, inventario.valorTotal, inventario.data, id])
    let info = respostas[0];

    return info.affectedRows;
}


export async function removerInventario(id) {
    const comando = `
        delete from db_autonomo_api.tb_inventario
         where id_inventario = ?;
    `;


    let respostas = await con.query(comando, [id]);
    let info = respostas[0];


    return info.affectedRows;
}
