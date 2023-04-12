const Role = require('../models/role');
const usuario = require('../models/usuario');

// Consultando si el rol existe en la base de datos
const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol: rol });
    if( !existeRol ){
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}


// Verificar si el correo existe
const emailExiste = async ( correo = '' ) => {
    const existeEmail = await usuario.findOne( {correo: correo} )
    if( existeEmail ){
        // return res.status(400).json({
        //     msg: 'Ese correo ya está registrado'
        // });
        throw new Error(`El correo ${correo}, ya está registrado`);
    }
}


const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}