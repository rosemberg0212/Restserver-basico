const {Producto} = require('../models')

const productoExiste = async (id)=>{
	const prodExiste = await Producto.findById(id)
    if(!prodExiste){
        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
	productoExiste
}