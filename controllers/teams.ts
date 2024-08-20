import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Op, literal } from 'sequelize';

import { User, Team, UserHasTeam, NotFoundError } from '../models';
import { IAssignUsersToTeamRequest, ICreateTeamRequest } from '../types';
import { getUsersIds } from '../helpers';

//* GETTERS
const getTeams = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        
        const teams = await Team.findAll();
        
        res.json({
            ok: true,
            teams
        });
    } catch (error) {
        next(error);
    }
};

const getTeam = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;

    try {
        
        //* Verificando existencia
        const team = await Team.findByPk(id);

        if (!team) {
            throw new NotFoundError();
        }

        res.json({
            ok: true,
            team
        });
    } catch (error) {
        next( error );
    }
};

const getTeamsByCreatorId = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;
    
    try {
        
        const teams = await Team.findAll({ where: { creatorId: id } });

        res.json({
            ok: true,
            teams
        });
    } catch (error) {
        next( error );
    }
};

const createTeam: RequestHandler = async ( req: Request, res: Response, next: NextFunction ) => {
    const { nameTeam, description } = req.body;
    
    try {
        const { uid } = req as ICreateTeamRequest;
        const team = await Team.create({ nameTeam, description, status: 1, creatorId: uid }); 

        res.json({
            ok: true,
            team
        });
    } catch (error) {
        next( error );
    }

};

const updateTeam = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;
    const { body } = req;

    try {
        
        //* Verificar Existencia
        const team = await Team.findByPk(id);

        if (!team) {
            throw new NotFoundError();
        }
        
        const teamUpdated = await team.update( body );

        res.json({
            ok: true,
            team: teamUpdated
        });

    } catch (error) {
        next( error);
    }
    
};
const deleteTeam = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;

    try {
        
        //* Verificar Existencia
        const team = await Team.findByPk(id);

        if (!team) {
            throw new NotFoundError();
        }

        const teamDeleted = await team.update({ status: 0 });

        res.json({
            ok: true,
            team: teamDeleted
        });
    } catch (error) {
        next( error );
    }
};

//* Asignación de usuarios a un equipo
// TODO: Re-factorizar |
const assignUsersToTeam = async ( req: Request, res: Response, next: NextFunction ) => {
    const { newUsers, oldUsers, teamId } = req.body as IAssignUsersToTeamRequest;

    const usersToRemove = oldUsers.filter( id => !newUsers.includes(id ));
    let usersToAdd = newUsers.filter( id => !oldUsers.includes(id));

    try {

        //* Buscando usuarios que ya pertenecen al team pero se encuentran con status: 0
        const disabledUsers = await User.findAll({
            where: {
                idUser: {
                    [ Op.and ]: [
                        {
                            [ Op.in ]: literal(`
                            (
                                SELECT idUser
                                FROM userHasTeam
                                WHERE idTeam = ${teamId} AND status = 0
                                )
                                `)
                        },
                        {
                            [ Op.in ]: usersToAdd
                        }
                    ]
                }
            }
        });

        const disabledUsersIds = getUsersIds( disabledUsers );
        
        usersToAdd = usersToAdd.filter( id => !disabledUsersIds.includes(id));
        
        //* Cambiando status de usuarios ya registrados en el grupo de 0 a 1
        await UserHasTeam.update(
            { status: 1 }, 
            {
                where: {
                    [Op.and]: [
                        { idUser: { [ Op.in ]: disabledUsersIds } }, 
                        { idTeam: teamId }
                    ]
                }
            }
        );
        
        //* Eliminando usuarios antiguos y añadiendo nuevos
        const [ usersRemoved, usersAssigned ] = await Promise.all([
            UserHasTeam.update(
                { status: 0 }, 
                { 
                    where: {
                        [Op.and]: [
                            { idUser: usersToRemove }, 
                            { idTeam: teamId }
                        ]
                    },
                },
                
            ),
            UserHasTeam.bulkCreate(usersToAdd.map( userId => ({ idUser: userId, idTeam: teamId })))
        ]);

        res.json({
            usersRemoved,
            usersAssigned,
            teamId
        });

    } catch (error) {
        next( error );
    }

};

//* Obtención de usuarios que se encuentran en el equipo
const getTeamMembers = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;

    try {
        
        // const teamMembers = await UserHasTeam.findAll({
        //     attributes: [],
        //     where: { idTeam: id },
        //     include: [
        //         {
        //             model: User,
        //             as: 'user',
        //             attributes: ['name', 'idUser', 'image']
        //         },
        //     ]
        // });

        const teamMembers = await User.findAll({
            where: {
                idUser: {
                    [ Op.in ]: literal(`
                            (SELECT idUser
                            FROM userHasTeam
                            WHERE idTeam = ${ id } and status = 1) 
                        `)
                }
            },
            attributes: ['name', 'idUser', 'image']
        });
    
        res.json({
            count: teamMembers.length,
            users: teamMembers
        });
    } catch (error) {
        next( error );
    }

};

//* Obtención de usuarios que no se encuentran registrados en un equipo
const getOtherUsers = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;

    try {
        
        const team = await Team.findByPk( id );

        if( !team ){
            throw new NotFoundError;
        }

        const otherUsers = await User.findAll({
            where: {
                idUser: {
                    [ Op.notIn ]: literal(`
                            (SELECT idUser
                            FROM userHasTeam
                            WHERE idTeam = ${ id } and status = 1)
                        `)
                }
            },
            attributes: ['name', 'idUser', 'image']
        });

        res.json({
            count: otherUsers.length,
            users: otherUsers
        });

    } catch (error) {
        next( error );
    }
};

export {
    assignUsersToTeam,
    createTeam,
    deleteTeam,
    getOtherUsers,
    getTeam,
    getTeams,
    getTeamsByCreatorId,
    getTeamMembers,
    updateTeam,
};