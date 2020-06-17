'use strict'

/*****PASO 2 *****/
var app = require( './app'); //Cargamos el archivo app que es la configuración de express
var port = 4700; //Creamos puerto de nuestro servidos


/*****  PASO 1 ********/
var mongoose = require('mongoose'); //Utilizamos el método require
mongoose.Promise = global.Promise; //Asignamos el metodo Promise
mongoose.connect('mongodb://localhost:27017/portafolio', { useNewUrlParser: true, useUnifiedTopology: true})//Utilizamos la funcion connect 
    .then(
        () => {
            console.log("Conexión a la base de datos establecida");

            //Ejecutamos la creación el servidor
            app.listen(port, ()=>{ //Utilizamos el metodo listen de Express y pasamos los parametros del puerto  y una función callback 
                console.log('Servidor activo en localhost: 4700');
            });
        }
    )
    .catch(err => console.log(err));