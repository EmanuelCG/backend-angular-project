'use strict'
// Los modelos son nuesvos documentos en la base de datos

var mongoose = require('mongoose'); // Cargamos mongoose 
var Schema = mongoose.Schema; // Definimos el esquema de un modelo con Schema
var ProjectSchema = Schema({ //El objeto molde el cual utilizaremos para crear documentos de este tipo
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema);
// projects -->guarda los documents en la colección

