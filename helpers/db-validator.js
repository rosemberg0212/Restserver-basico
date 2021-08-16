const Role = require('../models/rol')
const Usuario = require('../models/usuario')

const esRoleValido = async(rol = '')=>{
	const existeRol = await Role.findOne({rol});
	if(!existeRol){
		throw new Error(`El rol ${rol} no esta registrado en la BD`)
	}
}

//Verificar si el correo existe
const correoExiste = async (correo = '')=>{
	const emailExiste = await Usuario.findOne({correo})
    if(emailExiste){
        throw new Error(`El correo ${correo} ya existe`)
    }
}

const usuarioExiste = async (id)=>{
	const usuExiste = await Usuario.findById(id)
    if(!usuExiste){
        throw new Error(`El id ${id} no existe`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = '')=>{
	const incluida = colecciones.includes(coleccion);

	if(!incluida){
		throw new Error(`La coleccion ${coleccion} no es perimitida, ${colecciones}`);
	}

	return true;
}

module.exports = {
	esRoleValido,
	correoExiste,
	usuarioExiste,
	coleccionesPermitidas
}