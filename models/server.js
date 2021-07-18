const express = require('express')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT;

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
        this.app.listen(this.port, ()=>{
            console.log('corriendo en el puerto 8080', this.port)
        }) 
    }
}

module.exports = Server;