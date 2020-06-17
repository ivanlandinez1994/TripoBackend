var express = require('express');
var router = express.Router();
const chalk = require('chalk');

const Sc = require('../models/schemaUser');

/* GET home page. */
router.get('/', (req, res)=>{
  Sc.find() //trae los registros de la base de datos
  .then((users) => {
      res.send(users);
  })
  .catch(err => console.log(err));
});


module.exports = router;
