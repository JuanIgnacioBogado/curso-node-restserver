const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    const {
        limite = 5,
        desde = 0
    } = req.query;
    const estado = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(estado),
        Usuario.find(estado)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuariosPost = async (req = request, res = response) => {
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.json(usuario);
};

const usuariosPut = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json(usuario);
};

const usuariosDelete = async (req = request, res = response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(usuario);
};

const usuariosPatch = (req = request, res = response) => {
    res.json({msg: 'Patch API - Controlador'});
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}