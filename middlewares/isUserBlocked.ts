import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../config';
import { IDecodedToken } from '../types';
import { User } from '../models';

const isUserBlocked = async ( req: Request, res: Response, next: NextFunction ) => {
    const token = req.header('x-token');

    try {
        const { uid } = jwt.verify( token!, config.token.secretJWTSeed ) as IDecodedToken;

        const user = await User.findByPk( uid );

        if( +user!.status === 0 ){
            return res.status(401).json({ msg: 'Usuario bloqueado' });
        }
    } catch (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }

    next();
};

export {
    isUserBlocked
};