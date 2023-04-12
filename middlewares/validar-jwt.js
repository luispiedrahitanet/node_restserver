const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async ( req = request , res = response, next ) => {
    
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }


    
   try {

    const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    // leer el usuario que corresponde al id
    const usuario = await Usuario.findById( id );
    // si el usuario no existiera
    if( !usuario ){
        return res.status(401).json({
            msg: 'token no válido - Usuario no existe en la DB'
        })
    }


    // Verificar si el usuario tiene estado true
    if( !usuario.estado ){
        return res.status(401).json({
            msg: 'Token no valido - usuario con estado en false'
        })
    }

    req.usuario = usuario;
    next();

   } catch (error) {
        console.log( error );
        res.status(401).json({
            msg: 'Token no válido'
        })
   }

}


module.exports = {
    validarJWT
}
