const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const auth = require('../middlewares/auth');
const uploadFile = require('../aws/upload');

const schemaPost = require('../models/schemaPublicacion');
const schemaUser = require('../models/schemaUser');

router.get('/', auth, (req, res)=>{ //retorna todas las publicaciones
    schemaPost.find() //trae los registros de la base de datos
    .then((post) => {
        schemaUser.populate(post, {path: "user", select: "nombre apellido"})
        .then((posts)=>{
            res.status(200).send(posts)
        })
        .catch(err => res.status(400).send(chalk.red(err)));
    })
    .catch(err => res.status(500).send(chalk.red(err)));
});

router.post('/add', auth, async (req, res)=>{ //agrega una publicacion
    for (let i in req.body.fotos){
       var ruta = await uploadFile(req.body.fotos[i]);
        req.body.fotos[i] = ruta;
    }
    const Publicacion = new schemaPost(req.body);
    Publicacion.save() //guarda registro de la base de datos
    .then((Publicacion) => {
        //res.redirect('/users');
        res.status(200).send(`${Publicacion.nombre} se publico correctamente`)
    })
    .catch(err => res.status(500).send(chalk.red(err)));
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
        res.status(200).send(`La publicacion ${name} fue eliminada`)
    })
    .catch(err => res.status(500).send(chalk.red(err)));
})

router.put('/update/:id', auth, (req,res)=>{
    const { id } = req.params;
    schemaPost.updateOne({_id:id}, req.body)
    .then(()=>{
        //res.redirect('/users');
        res.status(200).send(`La publicacion ${req.body.nombre} fue actualizada`)
    })
    .catch(err => res.status(500).send(chalk.red(err)));
})

router.get('/post/:post', auth, (req,res)=>{
    const { post } = req.params
    
    schemaPost.find()
    .where("_id").equals(post)
    .then((post)=>{
        res.status(200).send(post)
    })
    .catch(err => res.status(500).send(chalk.red(err)));
})

module.exports = router;