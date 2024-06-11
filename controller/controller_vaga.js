/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Vagas
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/ 
const vagaDAO = require('../model/DAO/vaga.js')
const categoriaVagaDAO = require('../model/DAO/categoriaVaga.js')
const message = require('../config.js')

const getAllVagas = async function(){
    const vagasJSON = {}

    let dadosVagas = await vagaDAO.selectAllVagas()

    if(dadosVagas){
        let categoriaVaga
        let disponibilidade 
        let cobertura

        if(dadosVagas.length > 0){
            for (let index = 0; index < dadosVagas.length; index++) {
                const element = dadosVagas[index];
                
                categoriaVaga = await categoriaVagaDAO.selectTipoVagaById(element.id_categoria_vagas)
                element.categoria_vaga = categoriaVaga[0].categoria_vaga

                disponibilidade = await vagaDAO.selectDisponibilidade(element.id_disponibilidade)
                element.disponibilidade = disponibilidade[0].disponibilidade

                cobertura = await vagaDAO.selectCobertura(element.id_cobertura)
                element.cobertura = cobertura[0].cobertura
            }

            vagasJSON.vagas = dadosVagas
            vagasJSON.quantidade = dadosVagas.length
            vagasJSON.status_code = 200

            return vagasJSON
        }else{
            return message.ERROR_NOT_FOUND //404
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

const getBuscarVaga = async function(id){
    let idVaga = id

    if(idVaga == '' || idVaga == undefined || isNaN(idVaga)){
        return message.ERROR_INVALID_ID //400
    }else{
        const vagaJSON = {}

        let dadosVaga = await vagaDAO.selectByIdVaga(idVaga)
        console.log(dadosVaga);
        if(dadosVaga){
            if(dadosVaga.length > 0){
                let categoriaVaga = await categoriaVagaDAO.selectTipoVagaById(dadosVaga[0].id_categoria_vagas)
                let disponibilidade = await vagaDAO.selectDisponibilidade(dadosVaga[0].id_disponibilidade)
                let cobertura = await vagaDAO.selectCobertura(dadosVaga[0].id_cobertura)

                dadosVaga[0].categoria_vaga = categoriaVaga[0].disponibilidade
                dadosVaga[0].disponibilidade = disponibilidade[0].disponibilidade
                dadosVaga[0].cobertura = cobertura[0].cobertura


                vagaJSON.vaga = dadosVaga
                vagaJSON.status_code = 200

                return vagaJSON
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

const setInserirVaga = async function(dadosVaga, contentType){
    try {
        const content_type = contentType

        if(String(content_type).toLowerCase() == 'application/json'){
        if(
            dadosVaga.codigo_vaga == ''               || dadosVaga.codigo_vaga == null               || dadosVaga.codigo_vaga == undefined               || dadosVaga.codigo_vaga.length > 20               ||
            dadosVaga.piso == ''                      || dadosVaga.piso == null                      || dadosVaga.piso == undefined                      || isNaN(dadosVaga.piso)                           ||
            dadosVaga.id_categoria_vagas == ''        || dadosVaga.id_categoria_vagas == null        || dadosVaga.id_categoria_vagas == undefined        || isNaN(dadosVaga.id_categoria_vagas)             ||
            dadosVaga.id_disponibilidade == ''        || dadosVaga.id_disponibilidade == null        || dadosVaga.id_disponibilidade == undefined        || isNaN(dadosVaga.id_disponibilidade)             ||
            dadosVaga.id_cobertura == ''              || dadosVaga.id_cobertura == null              || dadosVaga.id_cobertura == undefined              || isNaN(dadosVaga.id_cobertura)             
        ){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let novaVaga = await vagaDAO.insertVaga(dadosVaga)
            let novoIdVaga = await vagaDAO.selectLastIdVagas()

            let vagaJSON = {}

            if(novaVaga){
                vagaJSON.id = Number(novoIdVaga[0]).id
                vagaJSON.vaga = dadosVaga
                vagaJSON.status_code = 200

                return vagaJSON
            }
            else{
                return message.ERROR_INTERNAL_SERVER //500
            }
        }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 controller
    }
}

module.exports = {
    getAllVagas,
    getBuscarVaga,
    setInserirVaga
}