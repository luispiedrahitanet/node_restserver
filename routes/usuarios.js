// ===== Manejo de Rutas desde Express ======
const { Router } = require('express');
// Llamamos la función de rutas
const router = Router();

const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

// Iportando las funcines de las rutas en los controladores
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuariosPutNE
} = require('../controllers/usuarios');




router.get('/', usuariosGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({ min:6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPut)
router.put('*', usuariosPutNE)

router.patch('/', usuariosPatch)

router.delete('/:id', [
    validarJWT,                                 // Hace referencia al middleware
    // esAdminRole,
    tieneRole( 'ADMIN_ROLE','VENTAS_ROLE', 'OTRO_ROLE' ),    // Ejecuta una funcion en el middleware
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete)



module.exports = router;