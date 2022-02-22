const {request, response} = require('express');

const {Categoria} = require('../models');

const obtenerCategorias = async (req = request, res = response) => {
    const {
        limite = 5,
        desde = 0
    } = req.query;
    const estado = {estado: true};

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(estado),
        Categoria.find(estado)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        categorias
    });
};

const obtenerCategoria = async (req = request, res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');

    res.json(categoria);
};

const crearCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre,
        usuario: req.usuario._id
    };

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);
};

const actualizarCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const {id} = req.params;

    const data = {
        nombre,
        usuario: req.usuario._id
    };

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true})

    res.json(categoria);
};

const borrarCategoria = async (req = request, res = response) => {
    const {id} = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(categoria);
};

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}