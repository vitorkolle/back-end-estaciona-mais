/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Tipo de veículo
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

const message = require('../config.js');

const tipoVeiculoDAO = require('../model/DAO/tipoVeiculo.js');

const getListarTiposVeiculos = async function () {

    const veiculoJSON = {}

    let dadosVeiculo = await tipoVeiculoDAO.selectAllTipoVeiculo()

    if (dadosVeiculo) {
        if (dadosVeiculo.length > 0) {
            veiculoJSON.veiculo = dadosVeiculo
            veiculoJSON.quantidade = dadosVeiculo.length
            veiculoJSON.status_code = 200

            return veiculoJSON
        }
        else {
            return message.ERROR_NOT_FOUND //404
        }
    }
    else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }

}

const getBuscarVeiculo = async function(id) {
    const veiculoJSON = {}

    let dadosVeiculo = await tipoVeiculoDAO.selectByIdVeiculo(id)

    if (dadosVeiculo) {
        if (dadosVeiculo.length > 0) {
            veiculoJSON.veiculo = dadosVeiculo
            veiculoJSON.quantidade = dadosVeiculo.length
            veiculoJSON.status_code = 200

            return veiculoJSON
        }
        else {
            return message.ERROR_NOT_FOUND//404
        }
    }
    else {
        return message.ERROR_INTERNAL_SERVER_DB//500     
    }
}

const setInserirTipoVeiculo = async function (dadosVeiculo, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            //objeto JSON de Ator
            const veiculoJSON = {}

            if (dadosVeiculo.tipo_veiculo == '' || dadosVeiculo.tipo_veiculo == null || dadosVeiculo.tipo_veiculo == undefined || dadosVeiculo.tipo_veiculo.length > 20) {
                return message.ERROR_REQUIRED_FIELDS //400
            }
            else {
                let tipoVeiculoNovo = await tipoVeiculoDAO.insertTipoVeiculo(dadosVeiculo)
                let idVeiculo = await tipoVeiculoDAO.selectLastIdTipoVeiculo()

                if (tipoVeiculoNovo) {
                    veiculoJSON.id = Number(idVeiculo[0].id)
                    veiculoJSON.tipo_veiculo = dadosVeiculo.tipo_veiculo
                    veiculoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    veiculoJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return veiculoJSON
                }
                else {
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER //500 controller
    }
}

const setAtualizarVeiculo = async function (dadosVeiculo, contentType, id) {
    //Validação do content-Type da requisição  
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            //Cria o objeto JSON para devolver 
            let novoTipoVeiculoJSON = {}
            //Validação de campos obrigatórios ou com digitação inválida 
            if (dadosVeiculo.tipo_veiculo == '' || dadosVeiculo.tipo_veiculo == undefined || dadosVeiculo.tipo_veiculo == null || dadosVeiculo.tipo_veiculo.length > 20) {
                return message.ERROR_REQUIRED_FIELDS; //400
            }
            else {
                let validarId = await tipoVeiculoDAO.selectByIdVeiculo(id)

                if(validarId.length > 0){
                    //Validação para verificar se podemos encaminhar os dados para o DAO
                    dadosVeiculo.id = id

                    //encaminha os dados da classificação para o DAo inserir no BD
                    let tipoAtualizado = await tipoVeiculoDAO.updateTipoVeiculo(dadosVeiculo)

                    //Validação para verificar se o DAO inseriu os dados do BD
                    if (tipoAtualizado) {
                        //Cria o JSON de retorno dos dados(201)
                        novoTipoVeiculoJSON.id = dadosVeiculo.id
                        novoTipoVeiculoJSON.tipo_veiculo = dadosVeiculo.tipo_veiculo
                        novoTipoVeiculoJSON.status = message.SUCCESS_CREATED_ITEM.status;
                        novoTipoVeiculoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                        novoTipoVeiculoJSON.message = message.SUCCESS_CREATED_ITEM.message;

                        return novoTipoVeiculoJSON; //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
                else{
                    return message.ERROR_INVALID_ID //400
                }
            }
        }

    }

    catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 ERRO NA CONTROLLER
    }


}

const setExcluirTipoVeiculo = async function (id) {
    try {
        //id das classificações
        let idV = id

        if (idV == null || idV == undefined || idV == '') {
            return message.ERROR_REQUIRED_FIELDS //400
        }
        else {
            let validarId = await tipoVeiculoDAO.selectByIdVeiculo(id)

            if(validarId){
                let dadosVeiculo = await tipoVeiculoDAO.deleteTipoVeiculo(idV)

                if (dadosVeiculo) {
                    return message.SUCCESS_DELETED_ITEM //200
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 controller
    }
}

module.exports = {
    getListarTiposVeiculos,
    getBuscarVeiculo,
    setInserirTipoVeiculo,
    setAtualizarVeiculo,
    setExcluirTipoVeiculo
}