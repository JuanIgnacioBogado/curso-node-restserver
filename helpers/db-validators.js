const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la DB`);
    }
};

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

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}