const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const schemaUser = require('../models/schemaUser');
const service = require('../services')

router.post('/signUp', (req,res)=>{
    const Usuario = new schemaUser(req.body);
    Usuario.save() //guarda registro de la base de datos
    .then((user) => {
        //res.redirect('/users');
        res.status(201).send({token: service.createToken(user)})
    })
    .catch(err => res.status(500).send({message: `Error al crear el usuario: ${err}`}));
});

router.post('/signIn', (req,res)=>{
    schemaUser.findOne({userName:req.body.userName})
    .then((user)=>{
        if (user.contrasenia===req.body.contrasenia)
        {
            res.status(200).send({
                message: `Te has logueado correctamente`,
                token: service.createToken(user)
            })
        }else{
            res.status(400).send({message: `Contraseña Incorrecta`});
        }
    })
    .catch(err => res.status(500).send({message: `No existe el usuario: ${err}`}));
})

router.get('/private', auth, (req,res)=>{
    res.status(200).send({message: `Tiene acceso`})
})

module.exports = router;