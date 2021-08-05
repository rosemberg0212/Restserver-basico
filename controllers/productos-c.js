const {Producto} = require('../models')


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

module.exports = {
    crearProductos
}