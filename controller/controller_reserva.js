/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Reserva
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

const reservaDAO = require('../model/DAO/reserva.js')
const message = require('../config.js')

const getListarReservas = async function () {

    const reservaJSON = {}

    let dadosReserva = await reservaDAO.selectAllReserva()

    if (dadosReserva) {
        if (dadosReserva.length > 0) {
            reservaJSON.veiculo = dadosReserva
            reservaJSON.quantidade = dadosReserva.length
            reservaJSON.status_code = 200

            return reservaJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const getListarReservaById = async function (id) {

    const reservaJSON = {}

    let dadosReserva = await reservaDAO.selectReservaById(id)

    if (dadosReserva) {
        if (dadosReserva.length > 0) {
            reservaJSON.veiculo = dadosReserva
            reservaJSON.quantidade = dadosReserva.length
            reservaJSON.status_code = 200

            return reservaJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const setInserirReserva = async function(dadosReserva, contentType){

    try {



        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const reservaJSON = {}


            if (dadosReserva.entrada == '' || dadosReserva.entrada == null || dadosReserva.entrada == undefined || dadosReserva.entrada.length > 30 ||
                dadosReserva.saida == '' || dadosReserva.saida == null || dadosReserva.saida == undefined || dadosReserva.saida.length > 30 ||
                dadosReserva.id_vaga == '' || dadosReserva.id_vaga == null || dadosReserva.id_vaga == undefined || dadosReserva.id_vaga.length > 20 ||
                dadosReserva.id_pagamento == '' || dadosReserva.id_pagamento == null || dadosReserva.id_pagamento == undefined || dadosReserva.id_pagamento.length > 20 ||
                dadosReserva.id_cliente == '' || dadosReserva.id_cliente == null || dadosReserva.id_cliente == undefined || dadosReserva.id_cliente.length > 20 ) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                let validadeStatus = true

                if(validadeStatus){
                    let reservaNova = await reservaDAO.insertReserva(dadosReserva)

                  console.log(reservaNova);
                    if(reservaNova){
                        reservaJSON.reserva = dadosReserva
                        reservaJSON.quantidade = dadosReserva.length
                        reservaJSON.status = message.SUCCESS_CREATED_ITEM.status
                        reservaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        reservaJSON.message = message.SUCCESS_CREATED_ITEM

                        return reservaJSON
                        
                    } else {
                       
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
            }
        } else {
           
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch {
         return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirReserva = async function(id){

    try {
        //id das classificações
        let idV = id


        if (idV == null || idV == undefined || idV == '') {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosReserva = await reservaDAO.deleteReserva(idV)


            if (dadosReserva) {
                return message.SUCCESS_DELETED_ITEM //201
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER_DB //500

    }



}

const setAtualizarReserva = async function(dadosReserva, contentType, id){

    try {


        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const reservaJSON = {}

            if (dadosReserva.entrada == '' || dadosReserva.entrada == null || dadosReserva.entrada == undefined || dadosReserva.entrada.length > 30 ||
            dadosReserva.saida == '' || dadosReserva.saida == null || dadosReserva.saida == undefined || dadosReserva.saida.length > 30 ||
            dadosReserva.id_vaga == '' || dadosReserva.id_vaga == null || dadosReserva.id_vaga == undefined || dadosReserva.id_vaga.length > 20 ||
            dadosReserva.id_pagamento == '' || dadosReserva.id_pagamento == null || dadosReserva.id_pagamento == undefined || dadosReserva.id_pagamento.length > 20 ||
            dadosReserva.id_cliente == '' || dadosReserva.id_cliente == null || dadosReserva.id_cliente == undefined || dadosReserva.id_cliente.length > 20 ) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                    dadosReserva.id = id
                    let reservaNova = await reservaDAO.updateReserva(dadosReserva)


                    if(reservaNova){
                        reservaJSON.id = id
                        reservaJSON.reserva = dadosReserva
                        reservaJSON.quantidade = dadosReserva.length
                        reservaJSON.status = message.SUCCESS_CREATED_ITEM.status
                        reservaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        reservaJSON.message = message.SUCCESS_CREATED_ITEM

                        return reservaJSON
                        
                    } else {
                       
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
            }
        } else {
           
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch {
         return message.ERROR_INTERNAL_SERVER
    }
}


module.exports = {
getListarReservas,
getListarReservaById,
setInserirReserva,
setExcluirReserva,
setAtualizarReserva
}