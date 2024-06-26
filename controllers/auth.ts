import { Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../models';
import { generateJWT } from '../helpers';
import { IRenewRequest } from '../types';

const login = async ( req: Request, res: Response ) => {
    const { email, password } = req.body;
    
    try {
        //* Verificar la existencia de un usuario mediante un email
        const user = await User.findOne({ where: { email }});

        if( !user ){
            return res.status(400).json({
                msg: 'Usuario no existe'
            });
        }
        
        //* Verificar si las contraseñas coinciden
        const validPassword = bcrypt.compareSync(String( password ), user.password);

        if( !validPassword ){
            return res.status(400).json({
                msg: 'Email/Password no valido'
            });
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
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contact to admin'
        
        });
    }
};

const register = async ( req: Request, res: Response ) => {
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
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contact to admin'
        
        });
    }
};

const renew: RequestHandler = async ( req: Request, res: Response ) => {
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
        res.status(500).json({
            ok: false,
            msg: 'Contact to admin'
        });
    }
};

export {
    login,
    register,
    renew
};