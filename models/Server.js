const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';

        // Conectar a la base de datos
        this.conectarDB();        

        // Middlewares
        this.middleware();

        // Rutas de mi aplicación
        this.routes();
    }




    // Conectar a la base de datos
    async conectarDB(){
        await dbConnection();
    }

    middleware(){

        // CORS
        this.app.use( cors() );

        // Recibir datos del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );
    }



    // =============== RUTAS ===============
    routes(){
        
        // Middleware (RutaUsar, RutaRequerida)
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.usuariosPath, require('../routes/usuarios') )

    }


    listen(){
        this.app.listen( this.port, ()=> {
            console.log( `Servidor corriendo por el puerto: ${this.port}` );
        })
    }

}

module.exports = Server;
