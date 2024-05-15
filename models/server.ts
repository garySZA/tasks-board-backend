import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { userRouter } from '../routes';
import { RoutesType } from '../types';
import { config } from '../config';

class Server {

    private app: Application;
    private port: string;
    private baseUrl: string ;
    private apiPaths: RoutesType;

    constructor() {
        this.app = express();
        this.port = config.port || '7997';
        this.baseUrl = config.base_url || '/api/v1';
        this.apiPaths = {
            users: `${ this.baseUrl }/users`,
        };

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