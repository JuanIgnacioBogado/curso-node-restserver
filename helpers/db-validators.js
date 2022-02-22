const {
    Categoria,
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
}

const noExisteCategoria = async id => {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
        throw new Error(`La categoría con el id: ${id} no existe`);
    }
    
    if (!categoria.estado) {
        throw new Error(`La categoría con el id: ${id} fue eliminada`);
    }
};

module.exports = {
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    noExisteCategoria
}