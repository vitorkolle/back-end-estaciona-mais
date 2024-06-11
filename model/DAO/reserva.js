/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Reserva
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/
const { PrismaClient } = require('@prisma/client') 

const prisma = new PrismaClient()

const selectAllReserva = async function () {

    let sql = `select * from tbl_reservas`

    let result = await prisma.$queryRawUnsafe(sql)
     
    if (result) {
        return result
    } else {

        return false

    }
}

const selectReservaById = async function (id) {

    let sql = `select * from tbl_reservas where id = ${id}`

    const rsReserva = await prisma.$queryRawUnsafe(sql)

    console.log(sql)

    if (rsReserva) {

        return rsReserva

    } else {
        return false
    }


}

const insertReserva = async function(dadosReserva){

let sql = `insert into tbl_reservas(entrada, saida, id_vaga, id_pagamento, id_cliente) values
('${dadosReserva.entrada}',
 '${dadosReserva.saida}',
'${dadosReserva.id_vaga}',
 '${dadosReserva.id_pagamento}',
 '${dadosReserva.id_cliente}')`

console.log(sql);

let rsReserva = await prisma.$executeRawUnsafe(sql)

if(rsReserva){
    return rsReserva
} else{
    return false
}



}

const deleteReserva = async function(id){

let sql = `delete from tbl_reservas where id = ${id}`
console.log(sql);

let rsReserva = await prisma.$executeRawUnsafe(sql)



if(rsReserva){
    return rsReserva
} else{
    return false
}

}

const updateReserva = async function(dadosReserva){

let sql = `UPDATE tbl_reservas SET
entrada = "${dadosReserva.entrada}",
saida = "${dadosReserva.saida}",
id_vaga = "${dadosReserva.id_vaga}",
id_pagamento = "${dadosReserva.id_pagamento}",
id_cliente = "${dadosReserva.id_cliente}"
where id = ${dadosReserva.id}`

console.log(sql);

let rsReserva = await prisma.$executeRawUnsafe(sql)

if(rsReserva){
    return rsReserva
} else{
    return false
}

}

module.exports = {

 selectAllReserva,
 selectReservaById,
 insertReserva,
 deleteReserva,
 updateReserva

}