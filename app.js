/************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação de API no projeto
 * Data: 21/05
 * Autor: Vitor Paes Kolle 
 * Versão: 1.0 
 ***********************************************************************************************************/

//Import das Bibliotecas que serão usadas no projeto
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


/***************************** Import das Controllers **********************************/
const controllerCategoriaVagas = require('./controller/controller_categoriaVaga.js')
const controllerCliente = require('./controller/controller_cliente.js')
const controllerCor = require('./controller/controller_cor.js')
const controllerFormaPagamento = require('./controller/controller_formaPagamento.js')
const controllerFuncionario = require('./controller/controller_funcionario.js')
const controllerMarca = require('./controller/controller_marca.js')
const controllerPagamentos = require('./controller/controller_pagamento.js')
const controllerRecibo = require('./controller/controller_recibo.js')
const controllerReserva = require('./controller/controller_reserva.js')
const controllerTipoVeiculo = require('./controller/controller_tipoVeiculo.js')
const controllerVaga = require('./controller/controller_vaga.js')
const controllerVeiculo = require('./controller/controller_veiculo.js')
/**************************************************************************************/

//Criação do app
const app = express()

//Mostrar como usar o App
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json()

/************************************Endpoints de Clientes*************************************/
//Get de Todos os Clientes
app.get('/v1/estacionaMais/clientes', cors(), async function (request, response) {

    let dadosClientes = await controllerCliente.getAllClientes()

    response.status(dadosClientes.status_code)
    response.json(dadosClientes)
})

//Get de cliente filtrando pelo id
app.get('/v1/estacionaMais/cliente/:id', cors(), async function (request, response) {
    let id = request.params.id

    let dadosCliente = await controllerCliente.getByIdCliente(id)

    response.status(dadosCliente.status_code)
    response.json(dadosCliente)
})
//Post de Clientes
app.post('/v1/estacionaMais/cliente', cors(), bodyParserJSON, async function (request, response) {
    const contentType = request.header('content-type')

    let dadosCliente = request.body

    let resultDadosCliente = await controllerCliente.setInserirCliente(dadosCliente, contentType)

    response.status(resultDadosCliente.status_code)
    response.json(resultDadosCliente)
})


//Delete de Clientes
app.delete('/v1/estacionaMais/cliente/:id', cors(), bodyParserJSON, async function (request, response) {
    let id = request.params.id

    let dadosCliente = await controllerCliente.setDeletarClientes(id)

    response.status(dadosCliente.status_code)
    response.json(dadosCliente)
})


/****************************Endpoint de Tipo de Veiculos**********************************/
//get de veículos
app.get('/v1/estacionaMais/tipoVeiculos', cors(), async function (request, response) {

    let dadosVeiculo = await controllerTipoVeiculo.getListarTiposVeiculos()

    response.status(dadosVeiculo.status_code)
    response.json(dadosVeiculo)
})

//get de veículo filtrando pelo id
app.get('/v1/estacionaMais/tipoVeiculo/:id', cors(), async function (request, response) {
    let id = request.params.id

    let dadosVeiculo = await controllerTipoVeiculo.getBuscarVeiculo(id)

    response.status(dadosVeiculo.status_code)
    response.json(dadosVeiculo)
})

//post de tipo de veículo
app.post('/v1/estacionaMais/tipoVeiculo', cors(), bodyParserJSON, async function (request, response) {

    const contentType = request.header('content-type')

    // Recebe todos os dados encaminhados na requisição pelo body        
    let dadosBody = request.body

    let resultDadosNovoTipoVeiculo = await controllerTipoVeiculo.setInserirTipoVeiculo(dadosBody, contentType)

    response.status(resultDadosNovoTipoVeiculo.status_code)
    response.json(resultDadosNovoTipoVeiculo)
})

//put de tipo de veículo
app.put('/v1/estacionaMais/tipoVeiculo/:id', cors(), bodyParserJSON, async function (request, response) {

    const contentType = request.header('content-type')

    let idV = request.params.id

    // Recebe todos os dados encaminhados na requisição pelo body        
    let dadosBody = request.body

    let resultDadosNovoTipo = await controllerTipoVeiculo.setAtualizarVeiculo(dadosBody, contentType, idV);

    response.status(resultDadosNovoTipo.status_code)
    response.json(resultDadosNovoTipo)
})

//delete de tipo de veículo
app.delete('/v1/estacionaMais/tipoVeiculo/:id', cors(), async function (request, response) {
    let idV = request.params.id

    let dadosVeiculo = await controllerTipoVeiculo.setExcluirTipoVeiculo(idV)

    response.status(dadosVeiculo.status_code)
    response.json(dadosVeiculo)


})
/***************************Endpoints de cores****************************/
//get de cores
app.get('/v1/estacionaMais/cores', cors(), async function (request, response) {

    let dadosCores = await controllerCor.getListarCores()

    response.status(dadosCores.status_code)
    response.json(dadosCores)
})

//get de cores filtrando pelo id
app.get('/v1/estacionaMais/cor/:id', cors(), async function (request, response) {
    let id = request.params.id

    let dadosCores = await controllerCor.getBuscarCor(id)

    response.status(dadosCores.status_code)
    response.json(dadosCores)
})


//post de cor
app.post('/v1/estacionaMais/cor', cors(), bodyParserJSON, async function (request, response) {

    const contentType = request.header('content-type')

    // Recebe todos os dados encaminhados na requisição pelo body        
    let dadosBody = request.body

    let resultDadosNovaCor = await controllerCor.setInserirCor(dadosBody, contentType)

    response.status(resultDadosNovaCor.status_code)
    response.json(resultDadosNovaCor)
})


//delete de core
app.delete('/v1/estacionaMais/cor/:id', cors(), async function (request, response) {
    let idCor = request.params.id

    let dadosCor = await controllerCor.setExcluirCor(idCor)

    response.status(dadosCor.status_code)
    response.json(dadosCor)
})


//put de cor
app.put('/v1/estacionaMais/cor/:id', cors(), bodyParserJSON, async function (request, response) {

    const contentType = request.header('content-type')

    let idCor = request.params.id

    // Recebe todos os dados encaminhados na requisição pelo body        
    let dadosBody = request.body

    let resultDadosNovaCor = await controllerCor.setAtualizarCor(dadosBody, contentType, idCor);

    response.status(resultDadosNovaCor.status_code)
    response.json(resultDadosNovaCor)
})


/********************************Endpoints de Marca*************************************/
app.get('/v1/estacionaMais/listarMarcas', cors(), async function(request, response){

    let resultDadosMarcas = await controllerMarca.getListarMarcas()
    
    response.status(resultDadosMarcas.status_code)
    response.json(resultDadosMarcas)
    
    
    
    })
    
    app.get('/v1/estacionaMais/marca/:id', cors(), async function(request, response){
    
    let idMarca = request.params.id
    
    let resultDadosMarcas = await controllerMarca.getListarMarcaById(idMarca)
    
    response.status(resultDadosMarcas.status_code)
    response.json(resultDadosMarcas)
    
    
    })
    
    app.post('/v1/estacionaMais/novaMarca', cors(), bodyParserJSON, async function(request, response){
    
        const contentType = request.header('content-type');
        console.log(contentType);
    
        // Recebe todos os dados encaminhados na requisição pelo body        
        let dadosBody = request.body
    
        let resultDadosNovaMarca= await controllerMarca.setInserirMarca(dadosBody, contentType);
    
        console.log(resultDadosNovaMarca)
        response.status(resultDadosNovaMarca.status_code)
        response.json(resultDadosNovaMarca)
    
    
    
    })
    app.delete('/v1/estacionaMais/deleteMarca/:id', cors(), async function(request, response){
    
    let id = request.params.id
    
    let resultDadosMarcas = await controllerMarca.setExcluirMarca(id)
    
    response.status(resultDadosMarcas.status_code)
    response.json(resultDadosMarcas)
    
    })
    app.put('/v1/estacionaMais/novaMarca/:id', cors(), bodyParserJSON, async function(request, response){
    
        let idV = request.params.id
    
        const contentType = request.header('content-type');
        console.log(contentType);
    
        // Recebe todos os dados encaminhados na requisição pelo body        
        let dadosBody = request.body
    
        let resultDadosNovaMarca = await controllerMarca.setInserirMarca(dadosBody, contentType, idV);
    
        console.log(resultDadosNovaMarca)
        response.status(resultDadosNovaMarca.status_code)
        response.json(resultDadosNovaMarca)
    
    
    
    })







//Ativação da porta 8080
app.listen('8080', function () {
    console.log('API funcionando e aguardando requisições!!!');
})