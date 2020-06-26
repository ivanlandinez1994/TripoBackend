const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaUser = require('../models/schemaUser');
mongoose.set('useCreateIndex', true);
const dotenv = require('dotenv'); //se utiliza para variables de sesion "heroku"
dotenv.config();
var fecha= Date.now();

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
    user: { 
        type: Schema.ObjectId, 
        ref: schemaUser,
        required: "Debe ingresar el id del usuario"
    },
    fechaPublicacion: {
        type: Date,
        default: fecha
    }
}, {
    versionKey: false, //elimina el __V ("Versionado")
    collection: process.env.COLECCIONPOST 
});

module.exports = mongoose.model(process.env.COLECCIONPOST, PostSchema);