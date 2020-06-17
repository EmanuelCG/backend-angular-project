'use strict'

var Project = require('../models/project');
var fs = require('fs'); //Importamos esta libreria para borrar archivos que no sean de la extensión que querramos
var path = require('path');

var controller = {
 

    home: function (req, res) {
        return res.status(200).send({
            message: "Soy el metodo home del controlador de Project"
        })
    },

    test: function (req, res) {
        return res.status(200).send({
            message: "Soy el metodo test del controlador de Project"
        });
    },

    //Metodo que guarda docuemento de tipo projecto en la base de datos
    saveProject: function (req, res) {
        var project = new Project();
        var params = req.body; // Creamos una variable para recojer (solicitar) los parametros que llegan por el body de la petición 

        //Asignamos valores a las propiedadess de nuestro Objeto Project

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;


        //Guardando nuestro objeto en la base de datos con el metodo save de mongoose
        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: "Error al guardar" });
            if (!projectStored) return res.status(404).send({ message: "No se ha podido guardo el proyecto" });
            return res.status(200).send({ project: projectStored });
        });

        //        return res.status(200).send({
        //            project: project,
        //           response: params, //Mostramos los parametros de la petición que hicimos en la variable params
        //           message: "Metodo saveProject"
        //        });
    },

    //Obtendremos con el metodo getProject un objeto de tipo proyecto

    getProject: function (req, res) {
        var projectId = req.params.id;
        //Utilizamos el modelo Project y luego el metodo de mongoose
        Project.findById(projectId, (err, project) => {
            //Si no pasamos el ID
            if (projectId == null) return res.status(404).send({ message: "No se ingreso ID" });
            if (err) return res.status(500).send({ message: "El objeto no existe" });
            if (!project) return res.status(404).send({ nessage: "El documento no existe" });
            res.status(200).send({
                project
            })
        }); //Utilizamos el metodo findById de mongoose para buscar por Id. Este recibe 2 parametros el id del documento y una funcion de callback
    },

    //Metodo para listar todos los projectos

    getProjects: function (req, res) {
        //Utilizamos el metodos find para mostrar todos los prodcutos
        Project.find({}).exec((err, projects) => { //Utilizamos el método exec donde pasamos 2 variables error y array de objetos.
            //METODO SORT para ordenar de mas antiguo a mas nuevo y colocamos el - para ordenar al reves
            if (err) return res.status(500).send({ message: "Error al retomar los datos" });
            if (!projects) return res.status(404).send({ message: "No se encuentran archivos" });
            return res.status(200).send({
                projects
            });
        });
    },

    //Metodo para actualizar proyectos

    updateProject: function (req, res) {
        var projectId = req.params.id; //Obtenemos el id
        var update = req.body; //Obtenemos el objeto completo

        Project.findById(projectId, update, { new: true }, (err, projectUpdate) => {
            if (projectUpdate == null) return res.status(404).send({ message: "Error, ingresar ID" });
            if (err) return res.status(500).send({ message: "Error al actualizar datos" });
            return res.status(200).send({
                projectUpdate
            });
        });
    },

    //Eliminar proyecto
    deleteProject: function (req, res) {
        var projectId = req.params.id;
        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
            if (err) return res.status(500).send({ message: "No se pudo borrar el documento" });
            if (!projectRemoved) return res.status(404).send({ message: "No se puede eliminar el Doc" });
            return res.status(200).send({
                project: projectRemoved // asignamos el paametro projectRemoved al objeto project
            });
        });
    },

    //subir imagenes
    uploadImage: function (req, res) {
        var projectId = req.params.id;
        var fileName = 'Imagen no subida';

        if (req.files) {
            var filePath = req.files.image.path; //Obtenemos el path del file
            var fileSplit = filePath.split('\\'); //Dividimos con Split usando una referencia del parametro
            //Se utiliza el "\"" y luego el valor que utilizaremos como separador
            var fileName = fileSplit[1]; //Obtenemos el 2do valor de la división
            var extSplit = fileName.split('\.'); 
            var fileExtSplit = extSplit[1];

            if (fileExtSplit == 'png' || fileExtSplit == 'jpg' || fileExtSplit == 'jpeg' || fileExtSplit == 'gif'){
                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdate) => {
                    if (err) return res.status(500).send({ message: "La imagen no se ha subido" });
                    if (!projectUpdate) return res.status(404).send({ message: "El proyecto no existe" });
                    return res.status(200).send({
                        project: projectUpdate
                    });
                });

            }else{
                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({message: "La extensión no es valida"});
                });
            } 

        } else {
            return res.status(200).send({
                message: fileName
            })
        }
    },

    getImageFile: function (req, res){
        var file = req.params.file;
        var pathFile = './uploads/' + file;
        fs.exists(pathFile, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(pathFile))
            }else{
                return res.status(200).send({message: "No existe la iamgen"});
            }
        });
    }
}

module.exports = controller; //Es importante exportar el objeto para poder importalo en otras secciones