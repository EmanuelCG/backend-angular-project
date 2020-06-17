'use strict'

var express = require('express'); //Importamos express (este framework permite crear el servidor recibir enviar información HTML, enrutar, etc)
var ProjectController = require('../controllers/project'); //Importamos el controlador
var router = express.Router();

//Creamos un Middlewares: Es algo que se ejecuta antes que se ejecute el metodo o la accion del controlador
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./uploads'});

router.get('/home', ProjectController.home) //Creamos la ruta home que cargae el metodo home del  ProjectController
router.post('/test', ProjectController.test) //
router.post('/save-project', ProjectController.saveProject);
router.post('/project/:id?', ProjectController.getProject); //La interrogación ? es para indicar que sea opcional
router.post('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject); //para actualizar utilizamos el metodo PUT
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage); // pasamos como segundo parametro el Middlewares
router.get('/get-image/:file', ProjectController.getImageFile);
module.exports = router;
