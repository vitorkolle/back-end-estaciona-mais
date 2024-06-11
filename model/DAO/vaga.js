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

const selectLastIdVagas = async function(){
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_vagas limit 1'

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

const insertVaga = async function(dadosVaga){
    try {
        let sql = 
        `
        insert into tbl_vaga(
                            codigo_vaga,
                            piso,
                            id_categoria_vagas,
                            id_disponibilidade,
                            id_cobertura
                            )
                            values
                            (
                               '${dadosVaga.codigo_vaga}',
                                ${dadosVaga.piso},
                                ${dadosVaga.id_categoria_vagas},
                                ${dadosVaga.id_disponibilidade}
                                ${dadosVaga.id_cobertura}
                            )
        `

        let rsVaga = await prisma.$executeRawUnsafe(sql)

        if(rsVaga){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteVaga = async function(id){
    try {
        let sql = `delete from tbl_vagas where id = ${id}`

        let rsVaga = await prisma.$executeRawUnsafe(sql)

        if(rsVaga){
            return true
        }else{
            return false
        }
    } catch (error) {
       return false 
    }
}

const updateVaga = async function(dadosVaga){
    try {
        let sql = 
        `
        update tbl vagas
        set
        codigo_vaga = '${dadosVaga.codigo_vaga}',
        piso = ${dadosVaga.piso},
        id_categoria_vagas = ${dadosVaga.id_categoria_vagas},
        id_disponibilidade = ${dadosVaga.id_disponibilidade},
        id_cobertura = ${dadosVaga.id_cobertura}
        `

        let rsVaga = await prisma.$executeRawUnsafe(sql)

        if(rsVaga){
            return true
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
    selectByIdVaga,
    selectLastIdVagas,
    insertVaga,
    deleteVaga,
    updateVaga
}