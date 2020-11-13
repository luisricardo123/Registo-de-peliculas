const express = require('express');
const mysql = require('mysql');
const path = require('path');
const morgan = require('morgan');
const moviesRouter = require('./routes/movies');
const actorRouter = require('./routes/actors');

const app = express();

//Configuración 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: false}));

//Rutas
app.use('/', moviesRouter);
app.use('/registrarActores', actorRouter);

//Servidor escuchando
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto',app.get('port'));
});