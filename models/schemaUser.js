const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.set('useNewUrlParser', true);
//mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const dotenv = require('dotenv'); //se utiliza para variables de sesion "heroku"
dotenv.config();

const UserSchema = new Schema({ // se define una estructura con la que se guardar en mongo db
    nombre: {
        type: String,
        required: "Es necesario un nombre",
        minlength: [3, "El nombre debe tener mas de 3 caracteres"],
    },
    apellido: {
        type: String,
        required: "Es necesario un apellido",
        minlength: [3, "El apellido debe tener mas de 3 caracteres"],
    },
    dni: {
        type: String,
        required: "El dni es obligatorio",
        unique:true,
        minlength: [6, "El minimo para el documento es de 6"],
        maxlength: [10, "El maximo para el documento es de 10"]
    },
    fechaNacimiento: Date,
    ubicacion:[String],
    nroTelefono: String,
    userName: {
        type: String,
        required: "El nombre de usuario es obligatorio",
        unique:true,
        minlength: [3, "El minimo para el nombre de usuario es de 3"]
    },
    contrasenia: {
        type:String,
        require:"Es necesario una contraseña",
        validate:{
            validator:function(pass){
                    if( this.password_confirmation!=undefined)
                        return this.password_confirmation==pass;
                    else{
                        return true;
                    }
            },
            message:"Las contraseñas son diferentes"
        }
    },
    email: {
        type: String,
        required: "El email de usuario es obligatorio",
        unique:true,
        minlength: [3, "El minimo para el email es de 3"]
    },
    rol: {
        type: String,
        default: "usuario"
    },
    activo:{
        type: Boolean,
        default: true
    },
}, {
    versionKey: false, //elimina el __V ("Versionado")
    collection: process.env.COLECCIONUSER 
});

UserSchema.virtual("password_confirmation").get(function(){
    return this.p_c
}).set(function(password){
    this.p_c=password;
})

module.exports = mongoose.model(process.env.COLECCIONUSER, UserSchema);