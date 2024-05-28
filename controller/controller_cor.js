/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Cores
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/ 
const message = require('../config.js');

const coresDAO = require('../model/DAO/cor.js')

const getListarCores = async function () {

    const coresJSON = {}

    let dadosCores = await coresDAO.selectAllCores()

    if (dadosCores) {
        if (dadosCores.length > 0) {
            coresJSON.veiculo = dadosCores
            coresJSON.quantidade = dadosCores.length
            coresJSON.status_code = 200

            return coresJSON
        }
        else {
            return message.ERROR_NOT_FOUND //404
        }
    }
    else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }

}

const getBuscarCor = async function(id) {
    const corJSON = {}

    let dadosCor = await coresDAO.selectByIdCor(id)

    if (dadosCor) {
        if (dadosCor.length > 0) {
            corJSON.veiculo = dadosCor
            corJSON.quantidade = dadosCor.length
            corJSON.status_code = 200

            return corJSON
        }
        else {
            return message.ERROR_NOT_FOUND//404
        }
    }
    else {
        return message.ERROR_INTERNAL_SERVER_DB//500     
    }
}

module.exports = {
    getListarCores,
    getBuscarCor
}