const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.set('useNewUrlParser', true);
//mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const dotenv = require('dotenv'); //se utiliza para variables de sesion "heroku"
dotenv.config();

const PostSchema = new Schema({ // se define una estructura con la que se guardar en mongo db
    nombre: {
        type: String,
        required: "Es necesario un nombre",
        minlength: [3, "El nombre debe tener mas de 3 caracteres"],
    },
    descripcion: {
        type: String,
        required: "Es necesario una descripción",
        minlength: [3, "La descripción debe tener mas de 3 caracteres"],
    },
    ubicacion: [Number],
    fotos: {
        type: [String],
        required: "No se puede agregar una publicacion sin fotos."
    },
    telefono: String,
    horarios:[{
        dia: Number,
        horaApertura: Date,
        horaFin: Date
    }],
    userName: {
        type: String,
        required: "El nombre de usuario es obligatorio",
        minlength: [3, "El minimo para el nombre de usuario es de 3"],
    },
}, {
    versionKey: false, //elimina el __V ("Versionado")
    collection: process.env.COLECCIONPOST 
});

/*PostSchema.virtual('userName').get(function() {
    return this.uN;
})
.set(function(user) {
    schema.find() //trae los registros de la base de datos
    .where("userName").equals(userName)
    //.where("publicaciones._id").equals(id)
    .then((publicaciones) => {
        publicaciones.push(req.body);
        res.send("publicacion agregada correctamente");
    })
}); */

module.exports = mongoose.model(process.env.COLECCIONPOST, PostSchema);