const {
    Categoria,
    Producto,
    Usuario
} = require('../models');

const emailExiste = async (correo = '') => {
    const email = await Usuario.findOne({correo});
    if (email) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
};

const existeUsuarioPorId = async id => {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
        throw new Error(`El usuario con el id: ${id} no existe`);
    }
};

const existeCategoria = async (nombre = '') => {
    const categoria = await Categoria.findOne({
        nombre: nombre.toUpperCase()
    });
    if (categoria) {
        throw new Error(`La categoría: ${nombre} ya existe`);
    }
};

const noExisteCategoria = async id => {
    if (id) {
        const categoria = await Categoria.findById(id);
        if (!categoria) {
            throw new Error(`La categoría con el id: ${id} no existe`);
        }

        if (!categoria.estado) {
            throw new Error(`La categoría con el id: ${id} fue eliminada`);
        }
    }
};

const noExisteProducto = async id => {
    if (id) {
        const producto = await Producto.findById(id);
        if (!producto) {
            throw new Error(`El producto con el id: ${id} no existe`);
        }

        if (!producto.estado) {
            throw new Error(`El producto con el id: ${id} fue eliminado`);
        }
    }
};

const coleccionesPermitidas = async (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida - ${colecciones}`);
    }
    return true;
};

module.exports = {
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    noExisteCategoria,
    noExisteProducto,
    coleccionesPermitidas
}