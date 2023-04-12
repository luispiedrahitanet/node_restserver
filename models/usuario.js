// 'S' en mayúscula y 'm' en minúscula
const { Schema, model } = require('mongoose');

// OBJETO LITERAL de tipo Schema
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Eliminando los elementos '__v' y 'password' para que no se envíen como respuesta
UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id; 
    return usuario;
}




// EXPORTAMOS EL MODELO
// Los dos argumentos son: 
//      1. El nombre que le queremos dar al schema
//      2. La función
module.exports = model( 'Usuario', UsuarioSchema );