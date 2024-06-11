/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Pagamento
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/
 const { PrismaClient } = require('@prisma/client')

 const prisma = new PrismaClient()

 const getAllPagamentos = async function(){
     try {
         let sql = 'select * from tbl_pagamentos'

         let rsPagamentos = await prisma.$queryRawUnsafe(sql)

         if(rsPagamentos){
             return rsPagamentos
         }else{
             return false
         }
     } catch (error) {
         return false
     }
 }

 module.exports = {
     getAllPagamentos
 }