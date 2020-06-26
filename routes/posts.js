const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const auth = require('../middlewares/auth');

const schemaPost = require('../models/schemaPublicacion');
const schemaUser = require('../models/schemaUser');

router.get('/', auth, (req, res)=>{ //retorna todas las publicaciones
    schemaPost.find() //trae los registros de la base de datos
    .then((post) => {
        schemaUser.populate(post, {path: "user", select: "nombre apellido"})
        .then((posts)=>{
            res.send({posts})
        })
        .catch(err => res.send(chalk.red(err)));
    })
    .catch(err => res.send(chalk.red(err)));
});

router.post('/add', auth, (req, res)=>{ //agrega una publicacion
    const Publicacion = new schemaPost(req.body);
    Publicacion.save() //guarda registro de la base de datos
    .then((Publicacion) => {
        //res.redirect('/users');
        res.send(`${Publicacion.nombre} se publico correctamente`)
    })
    .catch(err => res.send(chalk.red(err)));
});

router.delete('/delete/:id', auth, (req,res)=>{
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

router.put('/update/:id', auth, (req,res)=>{
    const { id } = req.params;
    schemaPost.updateOne({_id:id}, req.body)
    .then(()=>{
        //res.redirect('/users');
        res.send(`La publicacion ${req.body.nombre} fue actualizada`)
    })
    .catch(err => res.send(chalk.red(err)));
})

router.get('/post/:post', auth, (req,res)=>{
    const { post } = req.params
    
    schemaPost.find()
    .where("_id").equals(post)
    .then((post)=>{
        res.send(post)
    })
    .catch(err => res.send(chalk.red(err)));
})

module.exports = router;