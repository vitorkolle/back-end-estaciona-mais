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



module.exports = {
    getALLPagamentos
}