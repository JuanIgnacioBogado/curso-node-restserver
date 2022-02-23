const {request, response} = require('express');

const {Producto} = require('../models');

const obtenerProductos = async (req = request, res = response) => {
    const {
        limite = 5,
        desde = 0
    } = req.query;
    const estado = {estado: true};

    const [total, productos] = await Promise.all([
        Producto.countDocuments(estado),
        Producto.find(estado)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        total,
        productos
    });
};

const obtenerProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json(producto);
};

const crearProducto = async (req = request, res = response) => {
    const {nombre, precio, categoria, descripcion, disponible} = req.body;

    const existeProducto = await Producto.findOne({
        nombre: nombre.toUpperCase()
    });
    if (existeProducto) {
        return res.status(400).json({
            msg: `El producto ${nombre} ya existe`
        });
    }

    const data = {
        nombre: nombre.toUpperCase(),
        precio,
        categoria,
        descripcion,
        disponible,
        usuario: req.usuario._id
    };

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);
};

const actualizarProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const {nombre, precio, descripcion, disponible} = req.body;

    const data = {
        precio,
        descripcion,
        disponible,
        usuario: req.usuario._id
    };
    if (nombre) {
        data.nombre = nombre.toUpperCase();
    }

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})

    res.json(producto);
};

const borrarProducto = async (req = request, res = response) => {
    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(producto);
};

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}