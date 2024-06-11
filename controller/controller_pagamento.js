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



module.exports = {
    getALLPagamentos,
    getBuscarPagamento
}