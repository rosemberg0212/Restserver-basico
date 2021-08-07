const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT;

        this.paths = {
            authPath:   '/api/auth',
            usuarios:   '/api/usuarios',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            buscar:     '/api/buscar',
        }

        //conectar BD
        this.conectarDB()

        //Middlewares
        this.Middlewares()

        //Rutas de mi aplicacion
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    Middlewares(){
        //CORS
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'))
    }
    
    routes(){
        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
    }

    listem(){
        this.app.listen(this.port, ()=>{
            console.log('corriendo en el puerto', this.port)
        }) 
    }
}

module.exports = Server;