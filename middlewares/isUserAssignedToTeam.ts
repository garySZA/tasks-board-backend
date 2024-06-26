import { Op } from 'sequelize';
import { NextFunction, Request, Response } from 'express';

import { UserHasTeam } from '../models';

const isUserAssignedToTeam = async ( req: Request, res: Response, next: NextFunction ) => {
    const { userId, teamId } = req.body;
    
    const assignation = await UserHasTeam.findOne({
        where: {
            [Op.and]: [{ idUser: userId, idTeam: teamId }]
        }
    });

    if( assignation ){
        return res.status(400).json({
            msg: 'El usuario ya se encuentra asignado al equipo'
        });
    }

    next();
};

export { isUserAssignedToTeam };