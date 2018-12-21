'use strict'
//este esquema de  objeto  se separa del controlador para mantener  organizada la estrcuctura
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
     name: String,
     description: String,
     category: String,
     year: Number,
     langs: String,
     image: String
});

module.exports = mongoose.model('Project', ProjectSchema);

// este es un module el cual crea el esquema de como va a ser creada cada objeto que
// mandamos a mongo
