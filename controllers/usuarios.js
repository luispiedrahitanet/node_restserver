// Caracteristica de express para el intellisense del response en el editor (tipado)
const { request, response } = require('express');

// Modulo de cifrado
const bcryptjs = require('bcryptjs');

// Importamos el modelo de usuario, 'U' mayucula porque se van a crear instancias del modelo
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');




// request = request, res = response
const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const filtro = { estado: true };

    // const usuarios = await Usuario.find( filtro )
    //                                 .skip( Number(desde) )
    //                                 .limit( Number(limite) );

    // const total = await Usuario.countDocuments( filtro );

    //===> Enviando array de promesas; estandar de javascript <===
    const resp = await Promise.all(
        [
            Usuario.countDocuments( filtro ),
            Usuario.find( filtro )
                    .skip( Number(desde) )
                    .limit( Number(limite) )
        ]
    )

    const [ total, usuarios ] = resp;       // destructurando el Array

    res.json({
        total,
        usuarios
    })
}




const usuariosPost = async (req, res = response) => {      // res = response

    const { nombre, correo, password, rol } = req.body;
    // creamos una instancia del modelo Usuario importado de '..models/usuario'
    const usuario = new Usuario({ nombre, correo, password, rol });


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();    // 10 vueltas por defecto, Configuración
    usuario.password = bcryptjs.hashSync( password, salt )  // Ciframos la contraseña y la asignamos

    // Grabando los datos en Mongo Atlas
    await usuario.save()

    res.json({
        usuario
    })
}




const usuariosPut = async (req, res = response) => {      // res = response

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();    // 10 vueltas por defecto, Configuración
        resto.password = bcryptjs.hashSync( password, salt )  // Ciframos la contraseña y la asignamos
    }

    // Buscar por el 'id' y actualizarlo
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        usuario
    })
}
const usuariosPutNE = (req, res = response) => {      // res = response
    res.status('401').send("Error - No existe usuario")
}




const usuariosPatch = (req, res = response) => {      // res = response
    res.json({
        "msg": "patch API - controller"
    })
}





const usuariosDelete = async (req, res = response) => {      // res = response

    const { id } = req.params;
    
    // "Eliminanos" el usuario poniendo su "estado" en 'false'
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );
    

    res.json({
        usuario
    })
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuariosPutNE
}