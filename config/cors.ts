import { CorsOptions } from 'cors';

const allowedOrigins = ['http://localhost:8083', 'http://localhost:5173', 'http://localhost:8090'];

export const corsConfig: CorsOptions = {
    origin: ( origin, callback ) => {
        if( !origin || allowedOrigins.includes( origin ) ){
            callback( null, true );
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-token'],
    credentials: true
};