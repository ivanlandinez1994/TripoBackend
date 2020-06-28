const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const auth = require('../middlewares/auth');

const schema = require('../models/schemaUser');

router.get('/', auth, (req, res)=>{
    schema.find() //trae los registros de la base de datos
    .then((users) => {
        res.status(200).send(users);
    })
    .catch(err => res.status(500).send(chalk.red(err)));
});

router.get('/user/:user', auth, (req,res)=>{
    const { user } = req.params;
    schema.findOne({userName:user})
    .then((user)=>{
        if (!user){
            res.status(400).send("usuario no encontrado")
        }else{
            res.status(200).send(user)
        }
    })
    .catch(err => res.status(500).send(chalk.red(err)));
})

router.put('/update/:user', auth, (req,res)=>{
    const { user } = req.params;
    schema.updateOne({userName:user}, req.body, {runValidators:true})
    .then(()=>{
        //res.redirect('/users');
        res.status(200).send(`El usuario fue actualizado`)
    })
    .catch(err => res.status(500).send(chalk.red(err)));
})

router.put('/activar/:user', auth, (req,res)=>{
    const {user} = req.params;
    schema.findOne({userName:user})
    .then((user)=>{
        user.activo = !user.activo;
        user.save()
        .then(()=>{
            res.status(200).send(`Estado del usuario: ${user.activo?"Activo":"Inactivo"}`)
        })
        .catch(err => res.status(400).send(err.message));
        //res.redirect('/users');
    })
    .catch(err => res.status(500).send(chalk.red(err)));
})

/*router.delete('/delete/:user', auth, (req,res)=>{
    const { user } = req.params;
    var name;
    schema.findOne({userName:user})
    .then((user)=>{
        name = user.nombre;
    });

    schema.deleteOne({userName:user})
    .then(()=>{
        //res.redirect('/users');
        res.send(`El usuario ${name} fue eliminado`)
    })
    .catch(err => res.send(chalk.red(err)));
})*/

module.exports = router;