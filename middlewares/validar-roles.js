const { response } = require("express");



const esAdminRole = ( req, res = response, next ) => {

    // Verificar si estamos llamando correctamente al usuario
    if( !req.usuario ){
        return res.status(500).json({
            msg: 'Se requiere verificar el rol sin validar el tioken primero'
        });
    }

   
    // extraemos el rol y el nombre
    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }


    next()
}


// Este middleware retorna una función
const tieneRole = ( ...roles ) => {

    return ( req, res = response, next ) => {
        // console.log(roles, req.usuario.rol)

        if( !req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            });
        }

        // Verificamos si el rol del usuario tiene uno de los roles del parámetro
        if( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }


        next()
    }

}



module.exports = {
    esAdminRole,
    tieneRole
}