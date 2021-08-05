const {Router} = require('express');
const {check} = require('express-validator');

const {crearProductos} = require('../controllers/productos-c');

const {validarCampos, 
	validarJWT,  
	esAdminRole
} = require('../middlewares');

const router = Router();


router.get('/',(req, res)=>{
	res.json('ok')
});

router.get('/:id',(req, res)=>{
	res.json('get id')
});

router.post('/',[
	validarJWT
	],crearProductos);

router.put('/:id',(req, res)=>{
	res.json('put')
});

router.delete('/:id',(req, res)=>{
	res.json('delete')
});


module.exports = router