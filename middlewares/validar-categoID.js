const {Categoria} = require('../models')

const CategoriaExiste = async (id)=>{
	const cateExiste = await Categoria.findById(id)
    if(!cateExiste){
        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
	CategoriaExiste
}