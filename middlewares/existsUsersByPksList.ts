import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { IAssignUsersToTeamRequest } from '../types';

const existsUsersByPksList = async ( req: Request, res: Response, next: NextFunction ) => {
    const { users } = req.body as IAssignUsersToTeamRequest;

    const result = await User.findAll({
        where: {
            idUser: users
        }
    });
    
    const foundUserIds = result.map( user => user.idUser );
    const missingUserIds = users.filter( id => !foundUserIds.includes( id ));
    
    if( missingUserIds.length > 0 ){
        return res.status(400).json({
            msg: 'usuarios no existen',
            missingUserIds
        });
    }

    next();
};

export {
    existsUsersByPksList
};