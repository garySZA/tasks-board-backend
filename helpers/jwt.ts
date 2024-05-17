import jwt from 'jsonwebtoken';

import { config } from '../config';

const generateJWT = ( uid: number, name: string ) => {
    return new Promise(( resolve, reject ) => {
        const payload = { uid, name };

        jwt.sign( payload, config.token.secretJWTSeed, {
            expiresIn: `${ config.token.expiresIn }h` 
        }, ( error, token ) => {
            if( error ){
                console.log( error );

                reject('No se pudo generar el token');
            }

            resolve( token );
        });
    });
};

export {
    generateJWT
};