import { NextFunction, Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcryptjs';

import { NotFoundError, UnauthorizedError, User } from '../models';
import { generateJWT } from '../helpers';
import { IRenewRequest } from '../types';

const login = async ( req: Request, res: Response, next: NextFunction ) => {
    const { email, password } = req.body;
    
    try {
        //* Verificar la existencia de un usuario mediante un email
        const user = await User.findOne({ where: { email }});

        if( !user ){
            throw new NotFoundError();
        }
        
        //* Verificar si las contraseñas coinciden
        const validPassword = bcrypt.compareSync(String( password ), user.password);

        if( !validPassword ){
            throw new UnauthorizedError();
        }

        //* Generar JWT
        const token = await generateJWT( user.idUser, user.name );

        //* Responder con userID, name y token
        res.json({
            msg: 'login',
            uid: user.idUser,
            name: user.name,
            token
        });
    } catch (error) {
        next( error );
    }
};

const register = async ( req: Request, res: Response, next: NextFunction ) => {
    const { name, email, password } = req.body;

    try {
        //* Encriptando contraseña
        const salt = bcrypt.genSaltSync();
        const validPassword = bcrypt.hashSync( String( password ), salt );

        const user = await User.create({ name, email, password: validPassword }); 

        //* Generando JWT
        const token = await generateJWT(user.idUser, user.name);

        res.json({
            ok: true,
            user: {
                uid: user.idUser,
                name: user.name
            },
            token
        });
    } catch (error) {
        next( error );
    }
};

const renew: RequestHandler = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        
        const { uid, name } = req as IRenewRequest;

        //* Generando JWT
        const token = await generateJWT(uid, name);

        res.json({
            ok: true,
            uid,
            name,
            token
        });

    } catch (error) {
        next( error );
    }
};

export {
    login,
    register,
    renew
};