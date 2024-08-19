import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../config';
import { HttpStatusCode, IDecodedToken, ResponseMessage } from '../types';
import { findElementById } from '../helpers';
import { Project, UserHasTeam } from '../models';

export const isUserValidToCards = async ( req: Request, res: Response, next: NextFunction )=> {
    const token = req.header('x-token');
    const { id: idProject } = req.params;

    console.log(req.params, 'params');

    const { uid } = jwt.verify( token!, config.token.secretJWTSeed ) as IDecodedToken;
    const project = await findElementById( +idProject, 'project', false );

    if( project instanceof Project ){

        const userHasTeam = await UserHasTeam.findOne({ where: { idUser: uid, idTeam: project.idProject } });

        if( !userHasTeam ){
            return res.status( HttpStatusCode.UNAUTHORIZED ).json({
                msg: ResponseMessage.FORBIDDEN
            });
        }
    }

    next();
};