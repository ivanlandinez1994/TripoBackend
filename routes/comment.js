const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const schemaComment = require('../models/schemaComentario');

router.get('/:idPublicacion', (req, res)=>{ //retorna todas las publicaciones
    const { idPublicacion } = req.params;
    schemaComment.find()
    .where("publicacion").equals(idPublicacion) //trae los registros de la base de datos
    .then((comentarios) => {
        res.status(200).send(comentarios)
    })
    .catch(err => res.status(500).send(chalk.red(err)));
});

router.post('/add', (req, res)=>{ //agrega una publicacion
    const Comentario = new schemaComment(req.body);
    Comentario.save() //guarda registro de la base de datos
    .then(() => {
        //res.redirect('/users');
        res.status(200).send(`Se agrego el comentario correctamente`)
    })
    .catch(err => res.status(500).send(chalk.red(err)));
});

router.delete('/delete/:id', (req,res)=>{
    const { id } = req.params;
    schemaPost.deleteOne({_id:id})
    .then(()=>{
        //res.redirect('/users');
        res.status(200).send(`El comentario fue eliminado`)
    })
    .catch(err => res.status(500).send(chalk.red(err)));
})

router.put('/update/:id', (req,res)=>{
    const { id } = req.params;
    schemaPublicacion.updateOne({_id:id}, req.body)
    .then(()=>{
        //res.redirect('/users');
        res.status(200).send(`El comentario se actualizo correctamente.`)
    })
    .catch(err => res.status(500).send(chalk.red(err)));
})

module.exports = router;