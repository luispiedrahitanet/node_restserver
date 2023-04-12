const { validationResult } = require('express-validator');

// Comprobando si en la validación de la ruta hubieron errores
// Ojo a 'next' en los parámetros y finalizando la función
const validarCampos = ( req, res, next ) => {
    
    const errors = validationResult( req );
    
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}


module.exports = {
    validarCampos
}