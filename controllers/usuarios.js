const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {
    const {
        q,
        nombre = 'No name',
        apikey,
        page = 1,
        limit
    } = req.query;

    res.json({
        msg: 'Get API - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
};

const usuariosPut = (req = request, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'Put API - Controlador',
        id
    });
};

const usuariosPost = (req = request, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'Post API - Controlador',
        nombre,
        edad
    });
};

const usuariosDelete = (req = request, res = response) => {
    res.json({msg: 'Delete API - Controlador'});
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