var express = require('express');
var router = express.Router();
const chalk = require('chalk');

const Sc = require('../models/schema');

/* GET home page. */
router.get('/', (req, res)=>{
  Sc.find() //trae los registros de la base de datos
  .then((users) => {
      res.render('index', {
          users
      });
  })
  .catch(err => console.log(err));
});

router.post('/add', (req,res)=>{
  const Usuario = new Sc(req.body);
  Usuario.save() //guarda registro de la base de datos
  .then((msg) => {
      console.log(msg)
      res.redirect('/users');
  })
  .catch(err=>console.log(chalk.red(err)))
});

module.exports = router;
