import con from "./connection.js";

export async function inserirPessoalAgenda(pessoal) {
    const comando = `
        INSERT INTO tb_pessoal_cadastro_agenda (name, date, retun, time, mode)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    const [resultado] = await con.query(comando, [
        pessoal.name,
        pessoal.date,
        pessoal.retun,
        pessoal.time,
        pessoal.mode,
    ]);
    
    return resultado.insertId; 
}

export async function consultarTodosPessoal() {
    try {
        const comando = `
            SELECT * FROM db_autonomo_api.tb_pessoal_cadastro_agenda;
        `;
        const [registros] = await con.query(comando);
        return registros;
    } catch (error) {
        console.error("Erro ao consultar agenda pessoal:", error);
        throw new Error("Erro ao buscar agenda pessoal.");
    }
}

export async function consultarPessoalPorId(id) {
    const comando = `
        SELECT * FROM tb_pessoal_cadastro_agenda WHERE id = ?;
    `;
    
    const [registro] = await con.query(comando, [id]);
    return registro; 
}

export async function atualizarPessoal(id, pessoal, status) {
    const comando = `
        UPDATE tb_pessoal_cadastro_agenda 
        SET status= ?
        WHERE id= ?;
    `;
    
    const [resultado] = await con.query(comando, [
        pessoal.status,
        id
    ]);
    
    return resultado.affectedRows; 
}

export async function deletarPessoal(id) {
    const comando = `
        DELETE FROM tb_pessoal_cadastro_agenda WHERE id = ?;
    `;
    
    const [resultado] = await con.query(comando, [id]);
    return resultado.affectedRows; 
}
