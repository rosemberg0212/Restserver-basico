
const validarCampos = require('../middlewares/validar-campos')
const validarJWT  = require('../middlewares/validar-jwt');
const ValidarRoles = require('../middlewares/validar-roles')
const CategoriaExiste = require('../middlewares/validar-categoID')
const productoExiste = require('../middlewares/validar-productos')
const validarArchivo = require('../middlewares/vaidar-archivo')

module.exports = {
	...validarCampos,
	...validarJWT,
	...ValidarRoles,
	...CategoriaExiste,
	...productoExiste,
	...validarArchivo
}