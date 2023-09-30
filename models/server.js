const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuaiosPath = '/api/usuarios';

        //CONECTAR A BD
        this.coonectarDB();


        //Middlewares
        this.middlewares();
        //Rutas de aplicacion
        this.routes();

    }

    async coonectarDB() {
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use( cors());

        //LECTURA Y PARSEO DEL BODY
        this.app.use( express.json() );

        //directorio publico
        this.app.use( express.static('public') );
    }
        //ENDPOINDS
    routes() {
        this.app.use(this.usuaiosPath, require('../routes/usuarios'))
    }


        listen(){
            this.app.listen(this.port, () => {
                console.log('sERVIDOR CORRIENDO EN EL PUERTO', this.port);
            } );
        }


}

module.exports = Server;