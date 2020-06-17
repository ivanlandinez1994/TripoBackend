const indicative = require('indicative')

const userLoginDTOschema = {
  userName: 'required',
  password: 'required'
}

var login_post = function(req, res, next) {
  indicative.validate(req.body, userLoginDTOschema)
    .then(function() {
      // validation passed
      User.findOne({
          userName: req.body.userName,
          password: req.body.password
        },
        function(err, us) {
          if (err) {
            console.log(String(err));
            // en viejas versiones es send(500)
            res.sendStatus(500); // Internal Server Error
          }
          if (us) { 
            console.log("Usuario encontrado", us);
            res.send(us); // Ojo!!! aqui te faltaria filtrar el password y demas datos sensibles.
          } else {
            console.log("Usuario no encontrado", us);
            res.sendStatus(401); // Unauthorized
          }
        });
    }).catch(function(errors) {
      // validation failed
      res.sendStatus(400); // Bad Request
    })
}