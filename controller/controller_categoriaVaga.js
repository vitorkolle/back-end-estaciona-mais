/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Categoria de Vagas
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/
const vagaDAO = require('../model/DAO/categoriaVaga.js')
const message = require('../config.js')

const getListarTipoVaga = async function () {

    const vagaJSON = {}

    let dadosVaga = await vagaDAO.selectAllTipoVaga()

    if (dadosVaga) {
        if (dadosVaga.length > 0) {
            vagaJSON.veiculo = dadosVaga
            vagaJSON.quantidade = dadosVaga.length
            vagaJSON.status_code = 200

            return vagaJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const getBuscarTipoVagaById = async function(id){
    const vagaJSON = {}

    let dadosVaga = await vagaDAO.selectTipoVagaById(id)

    if(dadosVaga){
       if(dadosVaga.length > 0){
           vagaJSON.veiculo = dadosVaga
           vagaJSON.quantidade = dadosVaga.length
           vagaJSON.status_code = 200

           return vagaJSON
       } else{
           return message.ERROR_INTERNAL_SERVER_DB //500
       }
    } else{
        return message.ERROR_INTERNAL_SERVER //500 ERRO NA CONTROLLER
    }
}

const setInserirTipoVaga = async function(dadosVaga, contentType){
    try {



        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const vagaJSON = {}


            if (dadosVaga.categoria_vaga == '' || dadosVaga.categoria_vaga == null || dadosVaga.categoria_vaga == undefined || dadosVaga.categoria_vaga.length > 20) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{

                    let vagaNova = await vagaDAO.insertTipoVaga(dadosVaga)

                  console.log(vagaNova);
                    if(vagaNova){
                        vagaJSON.categoria_vaga = dadosVaga.categoria_vaga
                        vagaJSON.quantidade = dadosVaga.length
                        vagaJSON.status = message.SUCCESS_CREATED_ITEM.status
                        vagaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        vagaJSON.message = message.SUCCESS_CREATED_ITEM

                        return vagaJSON
                        
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

const setExcluirTipoVaga = async function(id){

try{

    let idV = id

    if(idV == null || idV == undefined || idV == '') {
        return message.ERROR_REQUIRED_FIELDS //400
    } else {
        let dadosVaga = await vagaDAO.deleteTipoVaga(idV)


        if (dadosVaga) {
            return message.SUCCESS_DELETED_ITEM //201
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }



} catch(error){

    return message.ERROR_INTERNAL_SERVER_DB

}

}

const setAtualizarCategoriaVaga = async function(categoriavaga, contentType, id){

    try {


        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const categoriaVagaJSON = {}

            if (categoriavaga.categoria_vaga == '' || categoriavaga.categoria_vaga == null || categoriavaga.categoria_vaga == undefined || categoriavaga.categoria_vaga.length > 20) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                    categoriavaga.id = id
                    let marcaNova = await vagaDAO.updateTipoVaga(categoriavaga)


                    if(marcaNova){
                        categoriaVagaJSON.id = id
                        categoriaVagaJSON.categoria_vaga = categoriavaga.categoria_vaga
                        categoriaVagaJSON.quantidade = categoriavaga.length
                        categoriaVagaJSON.status = message.SUCCESS_CREATED_ITEM.status
                        categoriaVagaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        categoriaVagaJSON.message = message.SUCCESS_CREATED_ITEM

                        return categoriaVagaJSON
                        
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
    getListarTipoVaga,
    getBuscarTipoVagaById,
    setInserirTipoVaga,
    setExcluirTipoVaga,
    setAtualizarCategoriaVaga
}