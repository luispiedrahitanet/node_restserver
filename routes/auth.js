// ===== Manejo de Rutas desde Express ======
const { Router } = require('express');
// Llamamos la función de rutas y la asignamos a una constante
const router = Router();

// ===== Validador de parámetros =======
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');



router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);


module.exports = router;