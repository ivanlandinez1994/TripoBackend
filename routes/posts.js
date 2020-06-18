const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const schemaPost = require('../models/schemaPublicacion');
const schemaUser = require('../models/schemaUser');

router.get('/', (req, res)=>{ //retorna todas las publicaciones
    schemaUser.find() //trae los registros de la base de datos
    .select("nombre")
    .select("apellido")
    .then((user) => {
        schemaPost.find()
        .then((post)=>{
            res.send({user,post})
        })
    })
    .catch(err => res.send(chalk.red(err)));
});

router.post('/add', (req, res)=>{ //agrega una publicacion
    const Publicacion = new schemaPost(req.body);
    Publicacion.save() //guarda registro de la base de datos
    .then((Publicacion) => {
        //res.redirect('/users');
        res.send(`${Publicacion.nombre} se publico correctamente`)
    })
    .catch(err => res.send(chalk.red(err)));
});

router.delete('/delete/:id', (req,res)=>{
    const { id } = req.params;
    var name;
    schemaPost.findOne({_id:id})
    .then((post)=>{
        name = post.nombre;
    });

    schemaPost.deleteOne({_id:id})
    .then(()=>{
        //res.redirect('/users');
        res.send(`La publicacion ${name} fue eliminada`)
    })
    .catch(err => res.send(chalk.red(err)));
})

router.put('/update/:id', (req,res)=>{
    const { id } = req.params;
    schemaPost.updateOne({_id:id}, req.body)
    .then(()=>{
        //res.redirect('/users');
        res.send(`La publicacion ${req.body.nombre} fue actualizada`)
    })
    .catch(err => res.send(chalk.red(err)));
})

module.exports = router;