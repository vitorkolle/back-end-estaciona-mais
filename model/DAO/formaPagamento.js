/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Forma de Pagamento
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/

//Import da biblioteca do prima/client para manipular os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

const selectAllPagamentos = async function(){

let sql = `select * from tbl_forma_pagamento`

console.log(sql)

const rsPagamento = await prisma.$queryRawUnsafe(sql)

if(rsPagamento){
    return rsPagamento
} else{
    return false
}

}

const selectAllFormaPagamentoById = async function(id){

let sql = `select * from tbl_forma_pagamento where id = ${id}`

console.log(sql)

const rsPagamento = await prisma.$queryRawUnsafe(sql)

if(rsPagamento){
    return rsPagamento
} else{
    return false
}

}

const insertFormaPagamento = async function(dadosPagamento){

let sql = `insert into tbl_forma_pagamento(forma_pagamento, nome_cartao, numero_cartao, data_vencimento, cvc, codigo_pix)values
('${dadosPagamento.forma_pagamento}',
    '${dadosPagamento.nome_cartao}',
    '${dadosPagamento.numero_cartao}',
    '${dadosPagamento.data_vencimento}',
    '${dadosPagamento.cvc}',
    '${dadosPagamento.codigo_pix}'
)`

console.log(sql)

const rsPagamento = await prisma.$executeRawUnsafe(sql)

if(rsPagamento){
    return rsPagamento
} else{
    return false
}


}

const deleteFormaPagamento = async function(id){

    let sql = `delete from tbl_forma_pagamento where id = ${id}`
   
    console.log(sql);
    
    let rsPagamento = await prisma.$executeRawUnsafe(sql)
    
    
    
    if(rsPagamento){
        return rsPagamento
    } else{
        return false
    }
    
    }
    

const updateFormaPagamento = async function(dadosPagamento){

let sql = `UPDATE tbl_forma_pagamento SET
forma_pagamento = "${dadosPagamento.forma_pagamento}",
nome_cartao = "${dadosPagamento.nome_cartao}",
numero_cartao = "${dadosPagamento.numero_cartao}",
data_vencimento = "${dadosPagamento.data_vencimento}",
cvc = "${dadosPagamento.cvc}"
where id = ${dadosPagamento.id}`

console.log(sql);

const rsPagamento = await prisma.$executeRawUnsafe(sql)

if(rsPagamento){
    return rsPagamento
} else{
    return false
}

}

module.exports = {

selectAllPagamentos,
selectAllFormaPagamentoById,
insertFormaPagamento, 
deleteFormaPagamento,
updateFormaPagamento

}