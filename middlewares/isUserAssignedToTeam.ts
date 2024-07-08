import { Op, literal } from 'sequelize';
import { NextFunction, Request, Response } from 'express';

import { User } from '../models';

const isUsersAssignedToTeam = async ( req: Request, res: Response, next: NextFunction ) => {
    const { newUsers, teamId, oldUsers } = req.body;

    const users = newUsers.filter( (id :number) => !oldUsers.includes(id));

    const assignation = await User.findAll({
        where: {
            idUser: {
                [ Op.and ]: [
                    {
                        [ Op.in ]: literal(`
                            (SELECT idUser
                            FROM userHasTeam
                            WHERE idTeam = ${teamId} and status = 1)
                        `)
                    },
                    {
                        [Op.in]: users
                    }
                ]
            }
        },
        attributes: ['name', 'idUser']
    });

    if( assignation.length > 0 ){
        const multipleUsers = assignation.length > 1;

        return res.status(400).json({
            msg: `${ multipleUsers ? 'Los Usuarios' : 'El usuario' } ya se ${ multipleUsers ? 'encuentran asignados' : 'encuentra asignado' } al equipo`,
            assigned: assignation
        });
    }

    next();
};

export { isUsersAssignedToTeam };