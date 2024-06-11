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

 const getByIdPagamento = async function(id){
     try {
         let sql = `select * from tbl_pagamentos where id = ${id}`

         let rsPagamento = await prisma.$queryRawUnsafe(sql)

         if(rsPagamento){
             return rsPagamento
         }else{
             return false
         }
     } catch (error) {
         return false
     }
 }

 const insertPagamento = async function(dadosPagamento){
     try {
         let sql = `insert into tbl_pagamentos(
                                              valor,
                                              data_pagamento,
                                              id_forma_pagamento,
                                              pago
                                               )
                                    values(
                                         ${dadosPagamento.valor},
                                         '${dadosPagamento.data_pagamento}',
                                         ${dadosPagamento.id_forma_pagamento},
                                         ${dadosPagamento.pago}
                                           )`

          let rsPagamento = await prisma.$executeRawUnsafe(sql)

          if(rsPagamento){
              return true
          }else{
              return false
          }
     } catch (error) {
         return false
     }
 }

 module.exports = {
     getAllPagamentos,
     getByIdPagamento,
     insertPagamento
 }