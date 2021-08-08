const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos, 
	validarJWT, 
	CategoriaExiste, 
	esAdminRole
} = require('../middlewares');

const {CrearCategoria,
	 ObtenerCategoria, 
	 ObtenerCategoriaId, 
	 actualizarCategoria,
	 BorrarCategoria
} = require('../controllers/categorias-c');

const router = Router();

//obtener todas las cotegorias - publico
router.get('/',[
	validarJWT
	],ObtenerCategoria);

//Obtener categoria por id - publico
router.get('/:id',[
	check('id','No es un ID valido').isMongoId(),
	check('id').custom(CategoriaExiste),
	validarCampos
	],ObtenerCategoriaId);

//crear categoria - privado - cualquier persona con un token valido
router.post('/',[
	validarJWT,
	check('nombre','El nombre es obligatorio').not().isEmpty(),
	validarCampos
	],CrearCategoria);

//actualizar - privado - cualquiera con token valido
router.put('/:id',[
	validarJWT,
	check('nombre','El nombre es obligatorio').not().isEmpty(),
	check('id','No es un ID valido').isMongoId(),
	check('id').custom(CategoriaExiste),
	validarCampos
	],actualizarCategoria);

//borrar una categoria - admin
router.delete('/:id',[
	validarJWT,
	esAdminRole,
	check('id','No es un ID valido').isMongoId(),
	check('id').custom(CategoriaExiste),
	validarCampos
	],BorrarCategoria);



module.exports = router