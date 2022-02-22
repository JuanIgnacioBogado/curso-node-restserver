const {Router} = require('express');
const {check} = require('express-validator');

const {
    existeCategoria,
    noExisteCategoria
} = require('../helpers/db-validators');

const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    borrarCategoria,
    actualizarCategoria
} = require('../controllers/categorias');

const {
    validarCampos,
    validarJWT,
    esAdminRole
} = require('../middlewares');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(noExisteCategoria),
    validarCampos
], obtenerCategoria);

// Privado
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la categoría es obligatorio').notEmpty(),
    check('nombre').custom(existeCategoria),
    validarCampos
], crearCategoria);

// Privado
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(noExisteCategoria),
    check('nombre', 'El nombre de la categoría es obligatorio').notEmpty(),
    check('nombre').custom(existeCategoria),
    validarCampos
], actualizarCategoria);

// Solo di es admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(noExisteCategoria),
    validarCampos
], borrarCategoria);

module.exports = router;