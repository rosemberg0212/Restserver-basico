const path = require('path')
const {v4: uuidv4} = require('uuid')

const exte = ['PNG', ,'png','JPG', 'jpg', 'jpeg', 'gif'];

const subirArchivo = (files, extensionesPermitidas = exte, carpeta= '')=>{

	return new Promise((resolve, reject)=>{

		const {archivo} = files;
	 	const nombreCortado = archivo.name.split('.');
	 	const extension = nombreCortado[nombreCortado.length - 1];

	 	//valida extensiones

	 	if(!extensionesPermitidas.includes(extension))
	 	{
	 		return reject(`La extension ${extension} no es perimitida`)
	 	}

	 	const nombreTemporal = uuidv4() + '.' + extension;
	  	const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemporal);

	  	// Use the mv() method to place the file somewhere on your server
	  	archivo.mv(uploadPath, (err)=> {
	  	  	if(err){
	  	    	reject(err);
	  		}

	  	  resolve(uploadPath);
	  	});
	})

}

module.exports = {
	subirArchivo
}