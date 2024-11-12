import con from "./connection.js";

export async function inserirInfPessoais(pessoaisObj){
    let comando = `insert into tb_informacoes_pessoais(nome, grupo, data_nascimento, idade, genero, email, celular, cpf, rg, telefone, pais, cep, cidade, estado, endereco, numero, bairro, complemento)
       values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    let resposta = await con.query (comando, [pessoaisObj.nome, pessoaisObj.grupo, pessoaisObj.nascimento, pessoaisObj.idade, pessoaisObj.genero, pessoaisObj.email, pessoaisObj.celular, pessoaisObj.cpf, pessoaisObj.rg, pessoaisObj.telefone, pessoaisObj.pais, pessoaisObj.cep, pessoaisObj.cidade, pessoaisObj.estado, pessoaisObj.endereco, pessoaisObj.numero, pessoaisObj.bairro, pessoaisObj.complemento])

    let into = resposta[0];

    return into.insertId;
}


export async function consultarPessoais() {
    let comando = `
        select*from tb_informacoes_pessoais;
    `
    let registro = await con.query(comando);
    let fim = registro[0];
    return fim;
}

export async function  consultaPorId(id) {
    let comando = `
    select nome,
    email,
    celular,
    cpf,
    rg,
    pais,
    cep,
    cidade, estado,
    endereco,
    numero,
    bairro,
    complemento
    from tb_informacoes_pessoais where id_informacoes_pessoais = ?;
    `;

    let registro = await con.query(comando, [id]);
    let fim = registro[0];
    return fim[0]; 
}

export async function  concultsrPorLetra(nome) {
    let comando = `
        select * from tb_informacoes_pessoais where nome like ?;
    `
    let registro = await con.query(comando, ["%",nome,"%"]);
    let re = registro[0];
    return re;
}

export async function deletaPessoas(id) {
    let comando = `
    delete from tb_informacoes_pessoais where id_informacoes_pessoais = ?
    `
    let registro = await con.query(comando, [id]);
    let fim = registro[0];
    return fim.affectedRows;
}

export async function updatePessoas(nome, email, celular, cpf, rg, pais, cep, cidade, estado, endereco, numero,  id) {
    let comando = `
        update tb_informacoes_pessoais
        set  nome = ?,
        email = ?,
        celular = ? ,
        cpf = ?,
        rg =?,
        pais =?,
        cep =?,
        cidade =?,
        estado =?,
        endereco= ?,
        numero =?,
        bairro =?,
        completo =?
        where id_informacoes_pessoais = ?
    `
    let registro = await con.query(comando, [pessoaisObj.nome, pessoaisObj.grupo, pessoaisObj.nascimento, pessoaisObj.idade, pessoaisObj.genero, pessoaisObj.email, pessoaisObj.celular, pessoaisObj.cpf, pessoaisObj.rg, pessoaisObj.telefone, pessoaisObj.pais, pessoaisObj.cep, pessoaisObj.cidade, pessoaisObj.estado, pessoaisObj.endereco, pessoaisObj.numero, pessoaisObj.bairro, pessoaisObj.complemento, id ])
    let fim = registro[0];
    return fim.affectedRows;

}