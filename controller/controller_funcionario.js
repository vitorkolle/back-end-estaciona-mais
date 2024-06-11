/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Funcionário
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

const funcionarioDAO = require('../model/DAO/funcionario.js')
const message = require('../config.js')

const getListarFuncionarios = async function () {

    const funcionarioJSON = {}

    let dadosFuncionario = await funcionarioDAO.selectAllFuncionario()

    if (dadosFuncionario) {
        if (dadosFuncionario.length > 0) {
            funcionarioJSON.funcionario = dadosFuncionario
            funcionarioJSON.quantidade = dadosFuncionario.length
            funcionarioJSON.status_code = 200

            return funcionarioJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const getListarFuncionarioById = async function (id) {

    const funcionarioJSON = {}

    let dadosFuncionario = await funcionarioDAO.selectFuncionarioById(id)

    if (dadosFuncionario) {
        if (dadosFuncionario.length > 0) {
            funcionarioJSON.veiculo = dadosFuncionario
            funcionarioJSON.quantidade = dadosFuncionario.length
            funcionarioJSON.status_code = 200

            return funcionarioJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const setInserirFuncionario = async function(dadosFuncionario, contentType){

    try {



        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const funcionarioJSON = {}


            if (dadosFuncionario.nome == '' || dadosFuncionario.nome == null || dadosFuncionario.nome == undefined || dadosFuncionario.nome.length > 50 ||
                dadosFuncionario.data_nascimento == '' || dadosFuncionario.data_nascimento == null || dadosFuncionario.data_nascimento == undefined || dadosFuncionario.data_nascimento.length > 15 ||
                dadosFuncionario.email == '' || dadosFuncionario.email == null || dadosFuncionario.email == undefined || dadosFuncionario.email.length > 100 ||
                dadosFuncionario.senha == '' || dadosFuncionario.senha == null || dadosFuncionario.senha == undefined || dadosFuncionario.senha.length > 50 ||
                dadosFuncionario.id_cargo == '' || dadosFuncionario.id_cargo == null || dadosFuncionario.id_cargo == undefined || dadosFuncionario.id_cargo.length > 50 
            ) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                let validadeStatus = true

                if(validadeStatus){
                    let funcionarioNovo = await funcionarioDAO.insertFuncionario(dadosFuncionario)

                  console.log(funcionarioNovo);
                    if(funcionarioNovo){
                        funcionarioJSON.funcionario = dadosFuncionario
                        funcionarioJSON.quantidade = dadosFuncionario.length
                        funcionarioJSON.status = message.SUCCESS_CREATED_ITEM.status
                        funcionarioJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        funcionarioJSON.message = message.SUCCESS_CREATED_ITEM

                        return funcionarioJSON
                        
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

const setExcluirFuncionario = async function(id){

    try {
        //id das classificações
        let idV = id


        if (idV == null || idV == undefined || idV == '') {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosFuncionario = await funcionarioDAO.deleteFuncionario(idV)


            if (dadosFuncionario) {
                return message.SUCCESS_DELETED_ITEM //201
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER_DB //500

    }



}

const setAtualizarFuncionario = async function(dadosFuncionario, contentType, id){

    try {


        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const funcionarioJSON = {}

            if (dadosFuncionario.nome == '' || dadosFuncionario.nome == null || dadosFuncionario.nome == undefined || dadosFuncionario.nome.length > 50 ||
            dadosFuncionario.data_nascimento == '' || dadosFuncionario.data_nascimento == null || dadosFuncionario.data_nascimento == undefined || dadosFuncionario.data_nascimento.length > 15 ||
            dadosFuncionario.email == '' || dadosFuncionario.email == null || dadosFuncionario.email == undefined || dadosFuncionario.email.length > 100 ||
            dadosFuncionario.senha == '' || dadosFuncionario.senha == null || dadosFuncionario.senha == undefined || dadosFuncionario.senha.length > 50 ||
            dadosFuncionario.id_cargo == '' || dadosFuncionario.id_cargo == null || dadosFuncionario.id_cargo == undefined || dadosFuncionario.id_cargo.length > 50 ) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                    dadosFuncionario.id = id
                    let funcionarioNovo = await funcionarioDAO.updateFuncionario(dadosFuncionario)


                    if(funcionarioNovo){
                        funcionarioJSON.id = id
                        funcionarioJSON.funcionario = dadosFuncionario
                        funcionarioJSON.quantidade = dadosFuncionario.length
                        funcionarioJSON.status = message.SUCCESS_CREATED_ITEM.status
                        funcionarioJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        funcionarioJSON.message = message.SUCCESS_CREATED_ITEM

                        return funcionarioJSON
                        
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
getListarFuncionarios,
getListarFuncionarioById,
setInserirFuncionario,
setExcluirFuncionario,
setAtualizarFuncionario
}