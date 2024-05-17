import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { IDecodedToken, IRenewRequest } from '../types';

const validateJWT = ( req: Request, res: Response, next: NextFunction ) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion',
        });
    }

    try {
        
        const { uid, name } = jwt.verify( token, config.token.secretJWTSeed ) as IDecodedToken;
        ( req as IRenewRequest ).uid = uid;
        ( req as IRenewRequest ).name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido',
        });
    }

    next();
};

export {
    validateJWT,
};