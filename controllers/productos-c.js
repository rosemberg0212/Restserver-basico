const {Producto} = require('../models')

const obtenerProductos = async(req, res)=>{
    const productos = await Producto.find({usuario: req.usuario, estado: true})
        .populate('usuario','nombre')
        .populate('categoria','nombre')

    res.json({
        productos
    });
}

const obtenerProducto = async(req, res)=>{
    const {id} = req.params;

    const producto = await Producto.findById(id)

    if(!producto.estado)
    {
        return res.status(400).json({
            msg:'producto no existe'
        })
    }

    res.json({
        producto
    })
}

const crearProductos = async (req, res)=>{
    const {estado, usuario, ...body} = req.body;

    const productoDb = await Producto.findOne({nombre: body.nombre});

    if(productoDb){
        return res.status(400).json({
            msg: `el producto ${productoDb.nombre}, ya existe`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    }
    
    const producto = new Producto(data);

    await producto.save();

    res.json(producto)
}

const editarProductos = async(req, res)=>{
    const {id} = req.params;

    const {estado, usuario, ...resto} = req.body

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;
    //resto.categoria = req.categoria._id

    const producto = await Producto.findByIdAndUpdate(id, resto, {new: true})

    res.json({
        producto
    })
}

const eliminarProductos = async(req, res)=>{
    const {id} = req.params; 

    const producto = await Producto.findByIdAndUpdate(id, {estado:false})

    res.json({
        producto,
    });
}

module.exports = {
    crearProductos,
    obtenerProductos,
    obtenerProducto,
    editarProductos,
    eliminarProductos
}