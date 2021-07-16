const {response} = require('express');

const usuariosGet = (req, res = response)=>{
    
    const params = req.query;

    res.json({
        msg:'get Api - Controlador',
        params
    });
}

const usuariosPut = (req, res = response)=>{

    const {id} = req.params;

    res.json({
        msg:'put Api - controlador',
        id
    });
}

const usuariosPost = (req, res = response)=>{

    const {nombre, edad} = req.body;

    res.json({
        msg:'post Api - controlador',
        nombre, edad
    });
}

const usuariosDelete = (req, res = response)=>{
    res.json({
        msg:'delete Api - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}