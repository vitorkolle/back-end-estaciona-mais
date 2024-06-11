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
                element.coberto = cobertura[0].cobertura
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

module.exports = {
    getAllVagas
}