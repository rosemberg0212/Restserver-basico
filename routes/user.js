const {Router} = require('express');
const {check} = require('express-validator');

const { usuariosGet, 
	usuariosPut, 
	usuariosPost, 
	usuariosDelete 
} = require('../controllers/user');

const {validarCampos, 
	validarJWT, 
	esAdminRole, 
	tieneRole
} = require('../middlewares/index')

const {esRoleValido, 
	correoExiste, 
	usuarioExiste
} = require('../helpers/db-validator');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id',[
	check('id','No es un ID valido').isMongoId(),
	check('id').custom(usuarioExiste),
	check('rol').custom(esRoleValido),
	validarCampos
],usuariosPut);

router.post('/',[
	check('nombre','El nombre es obligatorio').not().isEmpty(),
	check('password','El password debe ser mas de 6 letras').isLength({min: 6}),
	check('correo','El correo no es valido').isEmail(),
	check('correo').custom(correoExiste),
	//check('rol','El rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
	check('rol').custom(esRoleValido),
	validarCampos
],usuariosPost);

router.delete('/:id',[
	validarJWT,
	//esAdminRole,
	tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
	check('id','No es un ID valido').isMongoId(),
	check('id').custom(usuarioExiste),
	validarCampos
], usuariosDelete);



module.exports = router;