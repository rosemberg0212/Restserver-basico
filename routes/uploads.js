const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos, validarArchivo} = require('../middlewares')
const {cargarArchivo, actualizarImg} = require('../controllers/uploads-c')
const {coleccionesPermitidas} = require('../helpers/db-validator')

const router = Router();

router.post('/',validarArchivo,cargarArchivo)

router.put('/:coleccion/:id',[
	validarArchivo,
	check('id', 'El id no es valido').isMongoId(),
	check('coleccion').custom(c => coleccionesPermitidas(c ,['usuarios', 'productos'])),
	validarCampos
],actualizarImg)

module.exports = router