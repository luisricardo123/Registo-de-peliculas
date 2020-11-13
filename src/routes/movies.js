const express = require('express');
const router = express.Router();

//Controlador
const controller = require('../controllers/controllerMovies');

//Rutas
router.get('/', controller.form);
router.post('/registrar',controller.registrarPelicula)

module.exports = router;