const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.set('useNewUrlParser', true);
//mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const dotenv = require('dotenv'); //se utiliza para variables de sesion "heroku"
dotenv.config();

const CommentSchema = new Schema({ // se define una estructura con la que se guardar en mongo db
    Texto: {
        type: String,
        required: "Es necesario un comentario",
    }, 
    idPublicacion: {
        type: String,
        required: "El nombre de usuario es obligatorio"
    },
}, {
    versionKey: false, //elimina el __V ("Versionado")
    collection: process.env.COLECCIONCOMMENT 
});

module.exports = mongoose.model(process.env.COLECCIONCOMMENT, CommentSchema);