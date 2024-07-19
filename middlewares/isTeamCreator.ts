import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../config';
import { IDecodedToken } from '../types';
import { Team } from '../models';

const isTeamCreator = async ( req: Request, res: Response, next: NextFunction ) => {
    const token = req.header('x-token');
    const { idTeam } = req.body;

    try {
        const { uid } = jwt.verify( token!, config.token.secretJWTSeed ) as IDecodedToken;

        const result = await Team.findOne({ where: { creatorId: uid, idTeam } });
        
        if( !result ){
            throw new Error('No tiene permisos');
        }

    } catch (error) {
        return res.status(400).json({
            msg: 'No tiene permiso para realizar esta acción'
        });
    }
    next();
};

export { isTeamCreator };