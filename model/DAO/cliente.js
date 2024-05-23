/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Clientes
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const selectALLClientes = async function(){
    try {
        let sql = 'select * from tbl_clientes'

        let rsClientes = await prisma.$queryRawUnsafe(sql)

        if(rsClientes){
            return rsClientes
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectEnderecoClientes = async function(idEndereco){
    try {
        let sql = `select * from tbl_endereco_cliente where id = ${idEndereco}`

        let rsEndereco = await prisma.$queryRawUnsafe(sql)

        if(rsEndereco){
            return rsEndereco
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    selectALLClientes,
    selectEnderecoClientes
}