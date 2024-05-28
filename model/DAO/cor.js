/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Cores
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const selectAllCores = async function () {
    let sql = `select * from tbl_cores`

    let rsCores = await prisma.$queryRawUnsafe(sql)

    if (rsCores) {
        return rsCores
    } else {
        return false
    }
}


const selectByIdCor = async function (id) {
    try {
        let sql = `select * from tbl_cores where id = ${id}`

        let rsCores = await prisma.$queryRawUnsafe(sql)

        if (rsCores) {
            return rsCores
        } else {
            return false
        }
    } catch (error) {
        return false
    }

}

module.exports = {
    selectAllCores,
    selectByIdCor
}