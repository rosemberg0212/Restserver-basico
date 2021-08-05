const {Categoria} = require('../models')

const ObtenerCategoria = async (req, res)=>{
	const {limite = 10, desde = 0} = req.query;

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments({estado: true}),
        Categoria.find({estado: true})
        	.populate('usuario','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    });
}

const ObtenerCategoriaId = async (req, res)=>{
	const {id} = req.params;
	const existe = await Categoria.findById(id)

	res.json({
		existe
	})
}

const CrearCategoria = async (req, res)=>{
	const nombre = req.body.nombre.toUpperCase();

	const categoriaDb = await Categoria.findOne({nombre});

	if(categoriaDb){
		return res.status(400).json({
			msg: `La categoria ${categoriaDb.nombre} ya existe`
		});
	}

	//Generar data a guardar
	const data = {
		nombre,
		usuario: req.usuario._id
	}

	const categoria = new Categoria(data);

	//guardar en BD
	await categoria.save();

	res.json(categoria);
}

const actualizarCategoria = async (req, res)=>{
	const {id} = req.params;

	const {estado, usuario, ...resto} = req.body

	resto.nombre = resto.nombre.toUpperCase();
	resto.usuario = req.usuario._id;

	const categoria = await Categoria.findByIdAndUpdate(id, resto)

	res.json({
		resto
	})
}

const BorrarCategoria = async(req, res)=>{
	const {id} = req.params; 

    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false})

    res.json({
        categoria,
    });
}

module.exports = {
	CrearCategoria,
	ObtenerCategoria,
	ObtenerCategoriaId,
	actualizarCategoria,
	BorrarCategoria
}