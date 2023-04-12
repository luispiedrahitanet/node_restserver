const { response } = require("express");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const login = async (req, res = response) => {

    const { correo, password} = req.body;

    
    try {

        // Verificar si el usuario existe por medio del email
        const usuario = await Usuario.findOne({ correo: correo });
        if( !usuario ){
            return res.status(400).send({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }         

        // Verificar si el usuario está activo
        if( !usuario.estado ){
            return res.status(400).send({
                msg: 'Usuario / Password no son correctos - estado false'
            })
        }


        // Verificar la contraseña
        const passwordValido = bcryptjs.compareSync( password, usuario.password );
        if( !passwordValido ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }


        // Generar el JWT
        const token = jwt.sign(
                { id: usuario.id }, 
                process.env.SECRETORPRIVATEKEY,
                { expiresIn: '4h' }
            )

        
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    login
}