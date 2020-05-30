const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({ // se define una estructura con la que se guardar en mongo db
    nombre: {
        type: String,
        required: true
    },
    apellido: String,
    dni: String,
    fechaNacimiento: {// se agrega como objeto para guardar un valor por defecto.
        type: Date,
        default: '1994-12-14'   
    },
    status:{
        type: Boolean,
        default: false
    }
}, {
    versionKey: false, //elimina el __V ("Versionado")
    collection: "PruebasUsuario" 
});

module.exports = mongoose.model('PruebasUsuario', UserSchema);