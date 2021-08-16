const {Router} = require('express');
const {check} = require('express-validator');

const {crearProductos,
	obtenerProductos,
	obtenerProducto,
	editarProductos,
	eliminarProductos
} = require('../controllers/productos-c');

const {validarCampos, 
	validarJWT,  
	esAdminRole,
	CategoriaExiste,
	productoExiste
} = require('../middlewares');

const router = Router();


router.get('/',[validarJWT],obtenerProductos);

router.get('/:id',[
	check('id','No es un ID valido').isMongoId(),
	check('id').custom(productoExiste),
	validarCampos
],obtenerProducto);

router.post('/',[
	validarJWT,
	check('nombre','El nombre es obligatorio').not().isEmpty(),
	check('categoria','Debe enviar la categoria').not().isEmpty(),
	validarCampos
	],crearProductos);

router.put('/:id',[
	validarJWT,
	check('nombre','El nombre es obligatorio').not().isEmpty(),
	check('id','No es un ID valido').isMongoId(),
	check('id').custom(productoExiste),
	validarCampos
],editarProductos);

router.delete('/:id',[
	validarJWT,
	check('id','No es un ID valido').isMongoId(),
	check('id').custom(productoExiste),
	validarCampos
],eliminarProductos);


module.exports = router