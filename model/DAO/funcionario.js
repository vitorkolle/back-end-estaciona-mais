/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Funcionarios
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/

const { PrismaClient } = require('@prisma/client') 

const prisma = new PrismaClient()

const selectAllFuncionario = async function () {

    let sql = `select * from tbl_funcinarios`

    console.log(sql);

    let result = await prisma.$queryRawUnsafe(sql)
     
    if (result) {
        return result
    } else {

        return false

    }
}

const selectFuncionarioById = async function (id) {

    let sql = `select * from tbl_funcionarios where id = ${id}`

    const rsFuncionario = await prisma.$queryRawUnsafe(sql)

    console.log(sql)

    if (rsFuncionario) {

        return rsFuncionario

    } else {
        return false
    }


}

const insertFuncionario = async function(dadosFuncionario){

let sql = `insert into tbl_funcionarios(nome, data_nascimento, email, senha, id_cargo) values
('${dadosFuncionario.nome}',
    '${dadosFuncionario.data_nascimento}',
    '${dadosFuncionario.email}',
    '${dadosFuncionario.senha}',
    '${dadosFuncionario.id_cargo}'
)`

console.log(sql);

let rsFuncionario = await prisma.$executeRawUnsafe(sql)

if(rsFuncionario){
    return rsFuncionario
} else{
    return false
}



}

const deleteFuncionario = async function(id){

let sql = `delete from tbl_funcionarios where id = ${id}`
console.log(sql);

let rsFuncionario = await prisma.$executeRawUnsafe(sql)



if(rsFuncionario){
    return rsFuncionario
} else{
    return false
}

}

const updateFuncionario = async function(dadosFuncionario){

let sql = `UPDATE tbl_funcionarios SET
nome = "${dadosFuncionario.nome}",
data_nascimento = "${dadosFuncionario.data_nascimento}",
email = "${dadosFuncionario.email}",
senha = "${dadosFuncionario.senha}",
id_cargo = "${dadosFuncionario.id_cargo}"
where id = ${dadosFuncionario.id}`

console.log(sql);


let rsFuncionario = await prisma.$executeRawUnsafe(sql)

if(rsFuncionario){
    return rsFuncionario
} else{
    return false
}

}

module.exports = {

 selectAllFuncionario,
 selectFuncionarioById,
 insertFuncionario,
 deleteFuncionario,
 updateFuncionario

}