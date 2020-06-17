const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const schema = require('../models/schemaUser');

router.get('/', (req, res)=>{ //retorna todas las publicaciones
    schema.find() //trae los registros de la base de datos
    .select("nombre")
    .select("publicaciones")
    .then((publicaciones) => {
        res.send(publicaciones);
    })
    .catch(err => res.send(chalk.red(err)));
});

router.get('/post/:id', (req, res)=>{ //retorna todas las publicaciones
    schema.find() //trae los registros de la base de datos
    .select("nombre")
    .select("publicaciones")
    .where("publicaciones._id").equals(id)
    .then((publicaciones) => {
        res.send(publicaciones);
    })
    .catch(err => res.send(chalk.red(err)));
});

module.exports = router;