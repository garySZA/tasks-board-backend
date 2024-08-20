import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import color from 'colors';

import { authRouter, projectRouter, taskRouter, teamRouter, userRouter } from '../routes';
import { RoutesType } from '../types';
import { config, corsConfig } from '../config';
import { db } from '../db';

class Server {

    private app: Application;
    private port: number;
    private baseUrl: string ;
    private apiPaths: RoutesType;

    constructor() {
        this.app = express();
        this.port = config.port || 7997;
        this.baseUrl = config.baseUrl || '/api/v1';
        this.apiPaths = {
            auth: `${ this.baseUrl }/auth`,
            projects: `${ this.baseUrl }/projects`,
            tasks: `${ this.baseUrl }/project`,
            teams: `${ this.baseUrl }/teams`,
            users: `${ this.baseUrl }/users`,

        };

        //* DB Connection
        this.dbConnection();

        //* Middlewares: 
        this.middlewares();
        
        //* Definiendo rutas
        this.routes();

    }

    async dbConnection(){
        try {
            
            await db.authenticate();

            console.log('Database online'.bgCyan);

        } catch ( error ) {
            console.log( error );
        }
    }

    middlewares() {
        //* Morgan
        this.app.use( morgan( 'dev' ) );

        //* Cors
        this.app.use( cors( corsConfig ) );

        //* Lectura de body
        this.app.use( express.json() );

        //* Carpeta pública
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.apiPaths.auth, authRouter );
        this.app.use( this.apiPaths.projects, projectRouter );
        this.app.use( this.apiPaths.tasks, taskRouter );
        this.app.use( this.apiPaths.teams, teamRouter );
        this.app.use( this.apiPaths.users, userRouter );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto: '.underline.cyan, color.green( String(this.port) ));
        });
    }

}

export default Server;