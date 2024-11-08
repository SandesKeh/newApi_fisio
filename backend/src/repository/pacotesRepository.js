import con from "./connection.js";


export async function inserirPacotes(nome, valor){
    let comando = ` insert into tb_pacotes (nome,valor)
                    values (?,?)
    `;

    let resposta = await con.query (comando, [nome, valor]);
    let into = resposta[0]

    return into.insertId;
}

export async function consultarPacotes(){
    let comando = ` select * from tb_pacotes`;

    let resposta = await con.query (comando);

    let into = resposta[0];

    return into
}

export async function consultarPacotesPorId(id ) {
    const comando = `
        select * from tb_pacotes where id_pacotes= ?
    `;


    let respostas = await con.query(comando, [id]);
    let registros = respostas[0];
    
    return registros[0];

}

export async function alterarPacotes(nome, valor, id){
    let comando = ` update tb_pacotes 
                    set nome = ?,
                    valor = ?
                    where id_pacotes = ?
    `;

    let resposta= await con.query (comando, [nome, valor, id] );

    let into = resposta[0];

    return into.affectedRows;
}

export async function deletarPacotes(id){
    let comando = ` delete from tb_pacotes 
                        where id_pacotes = ?
            `;

    let resposta= await con.query (comando, id);
    let into = resposta[0];

    return into.affectedRows;
    
}