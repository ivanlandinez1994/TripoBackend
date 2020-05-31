const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const schema = require('../models/schema');

router.get('/', (req, res)=>{
    schema.find() //trae los registros de la base de datos
    .then((users) => {
        res.render('index', {
            users
        });
    })
    .catch(err => console.log(err));
});

router.post('/add', (req,res)=>{
    const Usuario = new schema(req.body);
    Usuario.save() //guarda registro de la base de datos
    .then((user) => {
        //res.redirect('/users');
        res.send(`Se agrego el usuario ${user.nombre} correctamente`)
    })
    .catch(err=>console.log(chalk.red(err)))
});

router.delete('/delete/:id', (req,res)=>{
    const { id } = req.params;
    var name;
    schema.findById(id)
    .then((user)=>{
        name = user.nombre;
    });

    schema.deleteOne({_id:id})
    .then(()=>{
        //res.redirect('/users');
        res.send(`El usuario ${name} fue eliminado`)
    })
    .catch(err => console.log(err));
})

router.get('/update/:id', (req,res)=>{
    const { id } = req.params;
    schema.findById(id)
    .then((user)=>{
        res.render('edit', {
            user
        })
    })
    .catch(err => console.log(err));
})

router.put('/update/:id', (req,res)=>{
    const { id } = req.params;
    schema.updateOne({_id:id}, req.body)
    .then(()=>{
        //res.redirect('/users');
        res.send(`El usuario ${req.body.nombre} fue actualizado`)
    })
    .catch(err => console.log(err));
})

router.put('/aprobar/:id', (req,res)=>{
    const {id} = req.params;
    schema.findById(id)
    .then((user)=>{
        user.status = !user.status;
        user.save();
        //res.redirect('/users');
        res.send(`Estado del usuario: ${user.status?"Activo":"Inactivo"}`)
    })
    .catch(err => console.log(err));
})

module.exports = router;