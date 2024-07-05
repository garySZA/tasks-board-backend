import { NextFunction, Request, Response } from 'express';

import { User } from '../models';
import { IAssignUsersToTeamRequest } from '../types';
import { getUsersNotFound, searchUsersByIdsList } from '../helpers';

const existsUsersByPksList = async ( req: Request, res: Response, next: NextFunction ) => {
    const { newUsers } = req.body as IAssignUsersToTeamRequest;

    const result = await User.findAll({
        where: {
            idUser: newUsers
        }
    });
    
    const foundUserIds = result.map( user => user.idUser );
    const missingUserIds = newUsers.filter( id => !foundUserIds.includes( id ));
    
    if( missingUserIds.length > 0 ){
        return res.status(400).json({
            msg: 'usuarios no existen',
            missingUserIds
        });
    }

    next();
};

const existsOldUsersByPksList = async ( req: Request, res: Response, next: NextFunction ) => {
    const { oldUsers } = req.body as IAssignUsersToTeamRequest;

    const result = await searchUsersByIdsList( oldUsers );
    const usersNotFound = getUsersNotFound( oldUsers, result );
    
    if( usersNotFound.length > 0 ){
        return res.status(400).json({
            msg: 'usuarios antiguos no existen',
            usersNotFound
        });
    }

    next();
};

export {
    existsUsersByPksList,
    existsOldUsersByPksList
};