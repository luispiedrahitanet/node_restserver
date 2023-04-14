const { response } = require("express");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { googleVerify } = require('../helpers/google-verify')


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

const googleSignin = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        
        // const googleUser = await googleVerify( id_token );
        // console.log( googleUser );
        const { nombre, correo, img } = await googleVerify( id_token );

        // Verificar si el correo ya existe en la DB
        let usuario = await Usuario.findOne({ correo });

        if( !usuario ){     //===> si no existe el usuario tengo que crearlo
            //datos que piede el modelo
            const data = {
                nombre,
                correo,
                password: ':P', // se puede porque el hash no lo deja repetir
                img,
                google: true
            };

            usuario = new Usuario( data );

            // Guardamos el usuario en la DB
            await usuario.save();
        }


        if(!usuario.estado){    //===> Si el usuario existe pero está bloqueado
            return res.status(401).json({
                msg: 'Hable con el administrado, usuario bloqueado'
            });
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
        });
        
    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es válido'
        });
    }
}


module.exports = {
    login,
    googleSignin
}