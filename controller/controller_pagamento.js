/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Pagamento
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/
const message = require('../config.js')
const pagamentoDAO = require('../model/DAO/pagamento.js')

const getALLPagamentos = async function(){
    let pagamentoJSON = {}

    let rsPagamento = await pagamentoDAO.getAllPagamentos()

    if(rsPagamento){
        if(rsPagamento.length > 0){

            // Fazer atribuição à forma de pagamento
            pagamentoJSON.pagamentos = rsPagamento
            pagamentoJSON.quantidade = rsPagamento.length
            pagamentoJSON.status_code = 200

            return pagamentoJSON
        }else{
            return message.ERROR_NOT_FOUND //404
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

const getBuscarPagamento = async function(id){
    let idPagamento = id

    if(idPagamento == '' || idPagamento == undefined || isNaN(idPagamento)){
        return message.ERROR_INVALID_ID //400
    }else{
        let pagamentoJSON = {}
        let resultPagamento = await pagamentoDAO.getByIdPagamento(idPagamento)

        if(resultPagamento){
            if(resultPagamento.length > 0){
                pagamentoJSON.pagamento = resultPagamento
                pagamentoJSON.status_code = 200

                return pagamentoJSON
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER //500
        }
    }
}

const setInserirPagamento = async function(dadosPagamento, contentType){
    const contentType = contentType
    let dadosPagamento = dadosPagamento

    if(String(contentType).toLowerCase() == 'application/json'){
    if
    (
        dadosPagamento.valor == ''              || dadosPagamento.valor == null              || dadosPagamento.valor == undefined              || isNaN(dadosPagamento.valor)                ||
        dadosPagamento.data_pagamento == ''     || dadosPagamento.data_pagamento == null     || dadosPagamento.data_pagamento == undefined     || dadosPagamento.data_pagamento.length != 19 ||
        dadosPagamento.id_forma_pagamento == '' || dadosPagamento.id_forma_pagamento == null || dadosPagamento.id_forma_pagamento == undefined || isNaN(dadosPagamento.id_forma_pagamento)   ||
        dadosPagamento.pago == ''               || dadosPagamento.pago == null               || dadosPagamento.pago == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS //400
    }else{
        let pagamentoJSON = {}
        let novoPagamento = await pagamentoDAO.insertPagamento(dadosPagamento)

        if(novoPagamento){
            pagamentoJSON.pagamento = dadosPagamento
            pagamentoJSON.status = message.SUCCESS_CREATED_ITEM.status
            pagamentoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            pagamentoJSON.message = message.SUCCESS_CREATED_ITEM.message

            return pagamentoJSON
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
    }else{
        return message.ERROR_CONTENT_TYPE //415
    }
        
}



module.exports = {
    getALLPagamentos,
    getBuscarPagamento,
    setInserirPagamento
}