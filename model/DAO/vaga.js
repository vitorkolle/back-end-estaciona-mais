/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Vaga
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/
const { PrismaClient } = require('@prisma/client') 

const prisma = new PrismaClient()

const selectAllVagas = async function(){
    try {
        let sql = 'select * from tbl_vagas'

        let rsVagas = await prisma.$queryRawUnsafe(sql)

        if(rsVagas){
            return rsVagas
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectDisponibilidade = async function(id){
    try {
        let sql = `select * from tbl_disponibilidade where id = ${id}`

        let rsDisponibilidade = await prisma.$queryRawUnsafe(sql)

        if(rsDisponibilidade){
            return rsDisponibilidade
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectCobertura = async function(id){
    try {
        let sql = `select * from tbl_cobertura where id = ${id}`

        let rsCobertura = await prisma.$queryRawUnsafe(sql)

        if(rsCobertura){
            return rsCobertura
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectByIdVaga = async function(id){
    try {
        let sql = `select * from tbl_vagas where id = ${id}`

        let rsVaga = await prisma.$queryRawUnsafe(sql)

        if(rsVaga){
            return rsVaga
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}
module.exports = {
    selectAllVagas,
    selectDisponibilidade,
    selectCobertura,
    selectByIdVaga
}