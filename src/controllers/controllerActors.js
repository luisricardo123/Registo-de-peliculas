const { urlencoded } = require('express');
const pool = require('../database');

const controller = {};

var actores = [];

controller.registrarActor = (req, res) => {
    let nombrePelicula = req.params.pelicula;
    res.render('actors', {
        titulo: 'Registrar actores',
        actores: actores,
        numActores: actores.length,
        pelicula: nombrePelicula
    });
    actores = [];
};

controller.enviarActor = (req, res) => {
    let datos = req.body;
    let nombrePelicula = req.params.pelicula;
    actores = [];
    //console.log(datos);
    pool.getConnection((err, connection) => {
        if(err) console.log('NO SE PUDO ESTABLECER LA CONEXIÓN');
        
        connection.query('SELECT nombre FROM clientes WHERE nombre in (?)', [datos.actor], (err, filas) => {
            if (err) console.log('NO SE PUDO REALIZAR LA CONSULTA');
            //console.log(filas);
            if (typeof datos.actor === 'string') { //Si solo hay un actor(input relleno), entonces req.body devuelve una cadena de texto por campo.
                let validActores = {}; 
                validActores.nombre = datos.actor;
                validActores.encontrado = false;
                if (filas.length) { //Si alguna fila devuelta por el query coincida con lo escrito en el input  
                    validActores.encontrado = true;
                };
                actores.push(validActores);                
            }
            else { //Si hay varios actores(varios inputs rellenos), entonces req.body devuelve un objeto. 
                datos.actor.forEach((el) => { 
                    let validActores = {}; 
                    validActores.nombre = el;
                    validActores.encontrado = false;
                    filas.forEach((fila) => {
                        if (fila.nombre === el) validActores.encontrado = true;
                    });
                    actores.push(validActores);
                });
            }
            //console.log(actores);
            res.redirect('/registrarActores/'+nombrePelicula);
            connection.release();
        });
    });
};

module.exports = controller;