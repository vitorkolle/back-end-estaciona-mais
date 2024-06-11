/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Forma de Pagamento
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

const message = require('../config.js');

const pagamentoDAO = require('../model/DAO/formaPagamento.js');

const getListarFormaPagamentos = async function () {

    const pagamentoJSON = {}

    let dadosPagamento = await pagamentoDAO.selectAllPagamentos()

    if (dadosPagamento) {
        if (dadosPagamento.length > 0) {
            pagamentoJSON.pagamento = dadosPagamento
            pagamentoJSON.quantidade = dadosPagamento.length
            pagamentoJSON.status_code = 200

            return pagamentoJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const getBuscarIdFormaPagamento = async function (id) {

    const pagamentoJSON = {}

    let dadosPagamento = await pagamentoDAO.selectAllFormaPagamentoById(id)

    if (dadosPagamento) {
        if (dadosPagamento.length > 0) {
            pagamentoJSON.pagamento = dadosPagamento
            pagamentoJSON.quantidade = dadosPagamento.length
            pagamentoJSON.status_code = 200

            return pagamentoJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const setAtualizarFormaPagamento = async function(dadosPagamento, contentType, id){

    try {


        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const pagamentoJSON = {}


            if (dadosPagamento.forma_pagamento == ''   || dadosPagamento.forma_pagamento == null  || dadosPagamento.forma_pagamento == undefined      || dadosPagamento.forma_pagamento.length > 20 || 
            dadosPagamento.nome_cartao == ''           || dadosPagamento.nome_cartao == null      || dadosPagamento.nome_cartao == undefined          || dadosPagamento.nome_cartao.length > 50     ||
            dadosPagamento.numero_cartao == ''         || dadosPagamento.numero_cartao == null    || dadosPagamento.numero_cartao == undefined        || dadosPagamento.numero_cartao.length > 100  ||
            dadosPagamento.data_vencimento == ''       || dadosPagamento.data_vencimento == null  || dadosPagamento.data_vencimento == undefined      || dadosPagamento.data_vencimento.length > 10  ||
            dadosPagamento.cvc == ''                   || dadosPagamento.cvc == null              || dadosPagamento.cvc == undefined                  || dadosPagamento.cvc.length > 3              ||
            dadosPagamento.codigo_pix == ''            || dadosPagamento.codigo_pix == null       || dadosPagamento.codigo_pix == undefined           || dadosPagamento.codigo_pix.length > 200  
        ) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                let validadeStatus = true

                if(validadeStatus){
                    dadosPagamento.id = id;
                    let formaPagamentoNovo = await pagamentoDAO.updateFormaPagamento(dadosPagamento)
                    console.log(formaPagamentoNovo);

                    if(formaPagamentoNovo){
                        pagamentoJSON.id = id
                        pagamentoJSON.file = dadosPagamento
                        pagamentoJSON.quantidade = dadosPagamento.length
                        pagamentoJSON.status = message.SUCCESS_CREATED_ITEM.status
                        pagamentoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        pagamentoJSON.message = message.SUCCESS_CREATED_ITEM

                        return pagamentoJSON
                        
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

const setInserirFormaPagamento = async function(dadosPagamento, contentType){

    try {


        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const pagamentoJSON = {}


            if (dadosPagamento.forma_pagamento == ''   || dadosPagamento.forma_pagamento == null  || dadosPagamento.forma_pagamento == undefined      || dadosPagamento.forma_pagamento.length > 20 || 
            dadosPagamento.nome_cartao == ''           || dadosPagamento.nome_cartao == null      || dadosPagamento.nome_cartao == undefined          || dadosPagamento.nome_cartao.length > 50     ||
            dadosPagamento.numero_cartao == ''         || dadosPagamento.numero_cartao == null    || dadosPagamento.numero_cartao == undefined        || dadosPagamento.numero_cartao.length > 100  ||
            dadosPagamento.data_vencimento == ''       || dadosPagamento.data_vencimento == null  || dadosPagamento.data_vencimento == undefined      || dadosPagamento.data_vencimento.length > 10  ||
            dadosPagamento.cvc == ''                   || dadosPagamento.cvc == null              || dadosPagamento.cvc == undefined                  || dadosPagamento.cvc.length > 3             ||
            dadosPagamento.codigo_pix == ''            || dadosPagamento.codigo_pix == null       || dadosPagamento.codigo_pix == undefined           || dadosPagamento.codigo_pix.length > 200 
        ) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                let validadeStatus = true

                if(validadeStatus){
                    dadosPagamento.id = id;
                    let formaPagamentoNovo = await pagamentoDAO.insertFormaPagamento(dadosPagamento)
                    console.log(formaPagamentoNovo);

                    if(formaPagamentoNovo){
                        pagamentoJSON.id = id
                        pagamentoJSON.file = dadosPagamento
                        pagamentoJSON.quantidade = dadosPagamento.length
                        pagamentoJSON.status = message.SUCCESS_CREATED_ITEM.status
                        pagamentoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        pagamentoJSON.message = message.SUCCESS_CREATED_ITEM

                        return pagamentoJSON
                        
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

const setExcluirFormaPagamento = async function(id){

    try {
        //id das classificações
        let idV = id


        if (idV == null || idV == undefined || idV == '') {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosPagamento = await pagamentoDAO.deleteFormaPagamento(idV)


            if (dadosPagamento) {
                return message.SUCCESS_DELETED_ITEM //201
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER_DB //500

    }


}

module.exports = {

getListarFormaPagamentos,
getBuscarIdFormaPagamento,
setAtualizarFormaPagamento,
setInserirFormaPagamento,
setExcluirFormaPagamento

}