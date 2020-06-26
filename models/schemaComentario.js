const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaPublicacion = require('./schemaPublicacion');
mongoose.set('useCreateIndex', true);
const dotenv = require('dotenv'); //se utiliza para variables de sesion "heroku"
dotenv.config();

const CommentSchema = new Schema({ // se define una estructura con la que se guardar en mongo db
    texto: {
        type: String,
        required: "Es necesario un comentario",
    }, 
    publicacion: { 
        type: Schema.ObjectId, 
        ref: schemaPublicacion,
        required: "Debe ingresar el id de la publicacion"
    } 
}, {
    versionKey: false, //elimina el __V ("Versionado")
    collection: process.env.COLECCIONCOMMENT 
});

module.exports = mongoose.model(process.env.COLECCIONCOMMENT, CommentSchema);