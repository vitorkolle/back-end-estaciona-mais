/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Clientes
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/
const message = require('../config.js')
const clienteDAO = require('../model/DAO/cliente.js')

const getAllClientes = async function(){
    const clientesJSON = {}

    let dadosClientes = await clienteDAO.selectALLClientes()

    if(dadosClientes){
        if(dadosClientes.length > 0){
            for (let index = 0; index < dadosClientes.length; index++) { 
                const element = dadosClientes[index]

                let enderecoClientes = await clienteDAO.selectEnderecoClientes(element.id_endereco_cliente)
                element.endereco = enderecoClientes[index]
            }

            clientesJSON.clientes = dadosClientes
            clientesJSON.quantidade = dadosClientes.length
            clientesJSON.status_code = 200

            return clientesJSON
        }
        else{
            return message.ERROR_NOT_FOUND //404
        }
    }
    else{
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

module.exports = {
    getAllClientes
}