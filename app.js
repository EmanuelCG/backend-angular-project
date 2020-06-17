'use strict'

//CREANDO SERVIDOR con NodeJS con Express

var express = require('express');
var bodyParser = require('body-parser'); //Transforma la información que enviamos al body en objeto JSON
var projectRoutes  = require('./routes/project');

var app = express(); //Creamos un objeto de express

//Cargar archivos de rutas

//Middlewares (Configuración necesaria)
app.use(bodyParser.urlencoded({ extended: false})); //Convertimos cualquier tipo de dato en objeto JSON con bodyParser
app.use(bodyParser.json());

//-------CORS------//
    // Configurar cabeceras y cors (CONFIGURACIÓN NECESARIA)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Rutas
app.use('/api', projectRoutes);



//RUTAS DE PRUEBA CON POST//

// app.get('/', (req, res) =>{
//    res.status(200).send(
//        "<h2>PAGINA DE INICIO</h2>"
//    );
//});


//RUTAS DE PRUEBA CON POST//
//app.post('/test/:id', (req, res) =>{ //req: es los datos que enviamos y res: la respuesta que envio
//    console.log(req.body.nombre);//Utilizamos body para acceder a las propiedades del cuerpo de la peticion
//    console.log(req.query.web);//Utilizamos query cuando pasamos prámentros por la URL
//   console.log(req.params.id)//params cuando añadimos parametros a la url de forma obligatoria
    
//    res.status(200).send({
//        message: 'Hola desde mi API de NodeJS'
//   });
//});

//Exportar el modulo
module.exports = app;
