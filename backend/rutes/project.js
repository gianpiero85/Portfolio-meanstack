'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');


var router = express.Router();
//con esta variable se trae la libreria multiparty para poder subir imagenes y se crea el midelware para ser ejecutado
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir:'./uploads'});

router.get('/home',ProjectController.home);
router.post('/test',ProjectController.test);
router.post('/save-project',ProjectController.saveProject);
router.get('/project/:id?',ProjectController.getProject);
router.get('/projects',ProjectController.getProjects);
// a diferencia del anterior este '/project/:id', no tiene el simbolo ? lo que significa q el parametro id es obligatorio para entrar en la ruta
router.put('/project/:id', ProjectController.updatePorject);
router.delete('/project/:id', ProjectController.deleteProject);
// se pasa el multipartMiddelware para que se ejecute entes de la accion o metodo  de uploadimage
router.post('/upload-image/:id',multipartMiddleware, ProjectController.uploadImage);
module.exports = router;
