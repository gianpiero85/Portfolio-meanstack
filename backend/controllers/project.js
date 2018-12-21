'use strict'
// se importa el modelo de project de la carpeta models para poder guardar
//en  saveProject con los esquemas definidos en ese modelo
var Project = require('../models/project');
var fs = require('fs');

var controller = {

    home:function(req, res){
      return res.status(200).send({
        message: 'soy la home'
      });
    },

    test:function(req, res){
      return res.status(200).send({
        message: 'soy el test'
      });
    },
// se usan los esquemas definidos en models/project.js
// metodo para gardar projecto
    saveProject: function(req, res){
      //se crea un nuevo objeto con los esquemas importados de models
      var project = new Project();

      var params = req.body;
      project.name = params.name;
      project.description = params.description;
      project.category = params.category;
      project.year = params.year;
      project.langs = params.langs;
      project.image = params.null;

//metodo para guardar mi objeto predefinido en la basse de datos
      project.save((err, projectStored) => {
        if(err) return res.status(500).send({ message: 'error al guardar'});
        if(!projectStored) return res.status(404).send({ message: ' no se ha podido guardar el projecto'})
        return res.status(200).send({project: projectStored});
      });

    },
//metodo para obtener un projecto con el id
    getProject: function(req, res){
      //asigna el valor del objeto en la base de datos a la variable
       var projectId = req.params.id
            if(projectId == null)return res.status(404).send({ message: 'el projecto no extiste'});

     // findById es un metodo de mongoos  para buscar objetos
       Project.findById(projectId, (err, project) =>{
           if(err) return res.status(500).send({ message: 'error al devolver los datos'});
             if(!project) return res.status(404).send({ message: 'el projecto no extiste'});
               return res.status(200).send({project});
       });
    },
// metodo para obtener todos los objetos de la base de datos
    getProjects: function(req, res){
// metodo find es metodo predeterminado para buscar en la base de datos se le puede mandar a buscar por nombre ano o lo que quieras si le pasas el dato dentro del find(name)
      Project.find({}).sort('-year').exec((err, projects) =>{
        // el metodo .sort('-year') permite ordenar los objetos devueltos por ano de mayor a MENOR
         if (err) return res.status(500).send({message: 'error al devolver los datos'});
         if (!projects) return res.status(404).send({ message: 'no hay proyectos para mostarr'});
         return res.status(200).send({projects});
      });
    },
// metodo que permite actualizar los datos de un objeto que esta en la base de datos
    updatePorject: function(req, res){
      // se crea la variable para obtener el ide del proyectos
      var projectId = req.params.id;
      var update = req.body;
// el metodo findByIdAndUpdate() se encuentra en la documentacion de mongus y es  para encontrar objeto y modificarlo
      Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
        // el {new:true } es para q me devuelva el objeto modificado  o nuevo
         if(err) return res.status(500).send({ message: 'error al actualizar'});
         if(!projectUpdated) return res.status(404).send({ message: 'no existe el proyecto'});
         return res.status(200).send({project : projectUpdated});
      });
    },

//metodo para eliminar proyectos
    deleteProject: function(req, res){
      var projectId = req.params.id;
      // nuevamente otro metodo definido por la libreria  para borrar  objetos en la base de datos findByIdAndRemove()
      Project.findByIdAndRemove(projectId, (err, projectRemoved)=>{
        if(err) return res.status(500).send({ message: 'no se ha podido borrar el proyecto'});
        if(!projectRemoved) return res.status(404).send({ message:'no se pudo eliminar el proyecto'});
        return res.status(200).send({ project: projectRemoved});

      });
    },
  //  metodo para subir imagenes a la base de datos
    uploadImage: function(req, res){
      var projectId = req.params.id;
      var fileName = 'imagen no subida';

      if(req.files){
        //con estas variables recogemos el path o nombre de la imagen en la base de datos y la hacemso ams manejable al codigo
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[1];
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];


                if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                  Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true},(err, projectUpdated) => {
                      if(err) return res.status(500).send({ message: ' la imagen no se ha subido'});
                      if(!projectUpdated) return res.status(404).send({ message: ' el proyecto no existe'});
                    return res.status(200).send({
                      project: projectUpdated
                    });
                  });
                } else {
                       fs.unlink(filePath, (err) => {
                         return res.status(200).send({message: 'la extencion no es valida'});
                       });
                }



      }else{
        return res.status(200).send({
          message: fileName
      });
      }
    }
};




module.exports = controller;
