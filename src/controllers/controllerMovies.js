const pool = require('../database');
const controller = {};

var encontrado = false;

controller.form = (req, res) => {
    res.render('movies', {
        encontrado: encontrado,
        titulo: 'Registrar película'
    });
    encontrado = false;
}

controller.registrarPelicula = (req, res) => {
    datos = req.body;    
    pool.getConnection((err, connection) => {
        connection.query('SELECT * FROM clientes WHERE nombre = ?', datos.nombre, (err, cliente) => {
            if(err) console.log('NO SE PUDO HACER LA CONSULTA');
            if(cliente.length){ //Encuentra la pelicula
                encontrado = true;
                res.redirect('/');
            }
            else{ //No encuentra la pelicula. prosigue a ingresar los actores
                encontrado = false;
                res.redirect('/registrarActores/'+ datos.nombre);
                
                
                /*connection.query('INSERT INTO clientes SET ?', datos.nombre, (err, row) => {
                    if(err) console.log('NO SE PUDO REGISTRAR');
                })*/
            };
            connection.release();
        });
    });
};

module.exports = controller;
