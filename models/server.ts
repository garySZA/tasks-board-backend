import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { userRouter } from '../routes';

class Server {

    private app: Application;
    private port: string;
    private baseUrl: string = '/api/v1';
    private apiPaths = {
        users: `${ this.baseUrl }/users`,
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '7997';

        //* Middlewares: 
        this.middlewares();

        //* Definiendo rutas
        this.routes();

    }

    middlewares() {
        //* Morgan
        this.app.use( morgan( 'dev' ) );

        //* Cors
        this.app.use( cors() );

        //* Lectura de body
        this.app.use( express.json() );

        //* Carpeta pública
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.apiPaths.users, userRouter );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto: ${ this.port }`);
        });
    }

}

export default Server;