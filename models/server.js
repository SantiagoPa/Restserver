
const express = require('express');
const cors    = require('cors');

const { dbConection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.usersPath = '/api/users';
        this.authPath  = '/api/auth';
        //conectar a base de datos
        this.conectDB();

        //middlewares
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();
    }

    async conectDB(){
        await dbConection();
    }

    routes(){
        this.app.use(this.authPath,  require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen(){

        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto', this.port);
        });

    }

    middlewares(){

        //CORS
        this.app.use(cors());

        // read and parse of body -- lectura y parseo del body
        this.app.use( express.json() );


        //directorio publico
        this.app.use(express.static('public'));

    }
}


module.exports = Server;