const {Router} = require('express');
const {check} = require('express-validator');

const {
    noExisteProducto,
    noExisteCategoria
} = require('../helpers/db-validators');

const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos');

const {
    validarJWT,
    validarCampos,
    esAdminRole
} = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(noExisteProducto),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'La categoría es obligatoria').notEmpty(),
    check('categoria', 'La categoría no es válida').isMongoId(),
    check('categoria').custom(noExisteCategoria),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(noExisteProducto),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(noExisteProducto),
    validarCampos
], borrarProducto);

module.exports = router;