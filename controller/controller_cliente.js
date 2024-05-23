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

const getByIdCliente = async function(id){

    let idCliente = id

    if(idCliente == '' || idCliente == undefined || isNaN(idCliente)){
        return message.ERROR_INVALID_ID //400
    }
    else{
    const clienteJSON = {}

    let dadosCliente = await clienteDAO.selectByIdCliente(id)

    if(dadosCliente){
        if(dadosCliente.length > 0){
            let enderecoCliente = await clienteDAO.selectEnderecoClientes(dadosCliente[0].id_endereco_cliente)

            clienteJSON.cliente = dadosCliente
            clienteJSON.endereco = enderecoCliente
            clienteJSON.status_code = 200

            return clienteJSON

        }else{
            return message.ERROR_NOT_FOUND //404
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}
}


module.exports = {
    getAllClientes,
    getByIdCliente
}