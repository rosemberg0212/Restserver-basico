const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const {subirArchivo} = require('../helpers/subir-archivo');
const {Usuario, Producto} = require('../models')


const cargarArchivo = async(req, res)=>{

 	try{
 		//const pathCompleto = await subirArchivo(req.files, ['txt', 'md'], 'textos');
 		const pathCompleto = await subirArchivo(req.files, undefined, 'img');

	  	res.json({
	  		path: pathCompleto
	  	})
 	}catch(msg){
 		res.status(400).json({msg})
 	}
}

const actualizarImg = async(req, res)=>{

	const {id, coleccion} = req.params

	let modelo;

	switch(coleccion){
		case 'usuarios':
			modelo = await Usuario.findById(id);
			if(!modelo){
				return res.status(400).json({
					msg: `No existe un usuario con el id ${id}`
				})
			}

		break;

		case 'productos':
			modelo = await Producto.findById(id);
			if(!modelo){
				return res.status(400).json({
					msg: `No existe un producto con el id ${id}`
				})
			}

		break;

		default:
			return res.status(500).json({msg: 'Se me olvido validar esto'})
	}

	//limpiar imagenes previas
	if(modelo.img){
		//borrar la img del servidor
		const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
		if(fs.existsSync(pathImagen)){
			fs.unlinkSync(pathImagen);
		}
	}

	const pathCompleto = await subirArchivo(req.files, undefined, coleccion);
	modelo.img = pathCompleto;

	await modelo.save(); 

	res.json({
		modelo
	})
}

const mostrarImg = async(req, res)=>{

	const {id, coleccion} = req.params;
	
	let modelo;

	switch(coleccion){
		case 'usuarios':
			modelo = await Usuario.findById(id);
			if(!modelo){
				return res.status(400).json({
					msg: `No existe un usuario con el id ${id}`
				})
			}

		break;

		case 'productos':
			modelo = await Producto.findById(id);
			if(!modelo){
				return res.status(400).json({
					msg: `No existe un producto con el id ${id}`
				})
			}

		break;

		default:
			return res.status(500).json({msg: 'Se me olvido validar esto'})
	}

	//limpiar imagenes previas
	if(modelo.img){
		//borrar la img del servidor
		const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
		if(fs.existsSync(pathImagen)){
			return res.sendFile(pathImagen)		
		}
	}

	res.json({msg: 'Falta place holder'})
}

const actualizarImgCloud = async(req, res)=>{
	const {id, coleccion} = req.params;
	
	let modelo;

	switch(coleccion){
		case 'usuarios':
			modelo = await Usuario.findById(id);
			if(!modelo){
				return res.status(400).json({
					msg: `No existe un usuario con el id ${id}`
				})
			}

		break;

		case 'productos':
			modelo = await Producto.findById(id);
			if(!modelo){
				return res.status(400).json({
					msg: `No existe un producto con el id ${id}`
				})
			}

		break;

		default:
			return res.status(500).json({msg: 'Se me olvido validar esto'})
	}

	if(modelo.img){
		const nombreArr = modelo.img.split('/');
		const nombre = nombreArr[nombreArr.length - 1];
		const [public_id] = nombre.split('.');
		cloudinary.uploader.destroy(public_id);
	}

	const {tempFilePath} = req.files.archivo
	const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

	modelo.img = secure_url;

	await modelo.save(); 

	res.json({
		modelo
	})

}

module.exports = {
	cargarArchivo,
	actualizarImg,
	mostrarImg,
	actualizarImgCloud
}