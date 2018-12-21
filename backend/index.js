'use strict'

//conectar la base de datos con el projecto
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

 mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost:27017/portafolio')
      .then(() => {
        console.log('conexion a la base de datos establecida con exito');
           //creacion del servidor
           app.listen(port, ()=>{
             console.log('servidor corriendo al pelo por la url: localhost:3700');
           })

      })
      .catch(err => console.log(err));
