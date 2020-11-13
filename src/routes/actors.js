const express = require('express');
const router = express.Router();

//Controlador
const controller = require('../controllers/controllerActors');

//Rutas
router.get('/:pelicula', controller.registrarActor);
router.post('/:pelicula',controller.enviarActor);

module.exports = router;