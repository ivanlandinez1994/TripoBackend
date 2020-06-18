const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const chalk = require('chalk');
const indexRouter = require('./routes/comment');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); //se utiliza para variables de sesion "heroku"

dotenv.config();


// Configuración - view engine setup
app.set('views', path.join(__dirname, 'views')); // Define carpeta de vistas
app.set('view engine', 'ejs'); //Usamos EJS como plantilla

app.use(express.json()); //método incorporado en express para reconocer el objeto de solicitud entrante como un objeto JSON
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //El rootargumento especifica el directorio raíz desde el que se sirven los activos estáticos
app.use(bodyParser.urlencoded({ extended: true }));//interpretar parametros del html
app.use(bodyParser.json())

// Routers
app.use('/comment', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

// Connect to DB
const uri = process.env.MONGOURI; //Uri de acceso from mongo
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true}) //Intento de coneccion
.then(result => console.log('Coneccion Correcta'))
.catch(err => console.log(chalk.red(err)))

// Ciddlewares
app.use(morgan('dev')); //para login
app.use(express.urlencoded({ extended: false })); //la opción extendida permite elegir entre analizar los datos codificados en URL con la biblioteca de cadena de consulta (cuando es falsa ) o la biblioteca qs (cuando es verdadera)

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//iniciar server
app.listen(app.get('port'), ()=>{
  console.log(`Server on port ${app.get('port')}`);
})

module.exports = app; // Exporta la aplicación
