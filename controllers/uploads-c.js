const path = require('path')

const cargarArchivo = (req, res)=>{


  	if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    	return res.status(400).json({msg:'No hay archivos en la peticion'});
 	}

  	
 	const {archivo} = req.files;
 	const nombreCortado = archivo.name.split(',');
 	console.log(nombreCortado)
  	/*const uploadPath = path.join(__dirname, '../uploads/', archivo.name);

  	// Use the mv() method to place the file somewhere on your server
  	archivo.mv(uploadPath, (err)=> {
  	  	if(err){
  	    	return res.status(500).json({err});
  		}

  	  res.json({msg:'File uploaded to'+ uploadPath});
  	});*/
}

module.exports = {
	cargarArchivo
}