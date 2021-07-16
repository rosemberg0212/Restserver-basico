const express = require('express')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express()

        //Middlewares
        this.Middlewares()

        //Rutas de mi aplicacion
        this.routes()
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
        this.app.use('/api/usuarios', require('../routes/user'))
    }

    listem(){
        this.app.listen(8000, console.log('corriendo en el puerto 8000'))
    }
}

module.exports = Server;