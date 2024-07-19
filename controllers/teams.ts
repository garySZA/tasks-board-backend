import { Request, RequestHandler, Response } from 'express';
import { Op, literal } from 'sequelize';

import { User, Team, UserHasTeam } from '../models';
import { IAssignUsersToTeamRequest, ICreateTeamRequest } from '../types';
import { getUsersIds } from '../helpers';

//* GETTERS
const getTeams = async ( req: Request, res: Response ) => {
    const teams = await Team.findAll();
    
    res.json({
        ok: true,
        teams
    });
};

const getTeam = async ( req: Request, res: Response ) => {
    const { id } = req.params;

    try {
        
        //* Verificando existencia
        const team = await Team.findByPk(id);

        if (!team) {
            return res.status(400).json({
                ok: false,
                msg: 'Team not found'
            });
        }

        res.json({
            ok: true,
            team
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contact with administrator'
        });
    }
};

const getTeamsByCreatorId = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    
    try {
        
        const teams = await Team.findAll({ where: { creatorId: id } });

        res.json({
            ok: true,
            teams
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contact with administrator'
        });
    }
};

const createTeam: RequestHandler = async ( req: Request, res: Response ) => {
    const { nameTeam, description } = req.body;
    
    try {
        const { uid } = req as ICreateTeamRequest;
        const team = await Team.create({ nameTeam, description, status: 1, creatorId: uid }); 

        res.json({
            ok: true,
            team
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contact with administrator'
        });
    }

};
const updateTeam = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    const { body } = req;

    try {
        
        //* Verificar Existencia
        const team = await Team.findByPk(id);

        if (!team) {
            return res.status(400).json({
                ok: false,
                msg: 'Team not found'
            });
        }
        
        const teamUpdated = await team.update( body );

        res.json({
            ok: true,
            team: teamUpdated
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contact with administrator'
        });
    }
    
};
const deleteTeam = async ( req: Request, res: Response ) => {
    const { id } = req.params;

    try {
        
        //* Verificar Existencia
        const team = await Team.findByPk(id);

        if (!team) {
            return res.status(400).json({
                ok: false,
                msg: 'Team not found'
            });
        }

        const teamDeleted = await team.update({ status: 0 });

        res.json({
            ok: true,
            team: teamDeleted
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contact with administrator'
        });
    }
};

//* Asignación de usuarios a un equipo
// TODO: Re-factorizar |
const assignUsersToTeam = async ( req: Request, res: Response ) => {
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
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contact with administrator'
        });
    }

};

//* Obtención de usuarios que se encuentran en el equipo
const getTeamMembers = async ( req: Request, res: Response ) => {
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
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contact with administrator'
        });
    }

};

//* Obtención de usuarios que no se encuentran registrados en un equipo
const getOtherUsers = async ( req: Request, res: Response ) => {
    const { id } = req.params;

    try {
        
        const team = await Team.findByPk( id );

        if( !team ){
            res.status(400).json({
                msg: 'No team found'
            });
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
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contact with administrator'
        });
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