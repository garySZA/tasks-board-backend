import { Request, RequestHandler, Response } from 'express';
import { Team } from '../models';
import { ICreateTeamRequest } from '../types';

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

export {
    createTeam,
    deleteTeam,
    getTeam,
    getTeams,
    getTeamsByCreatorId,
    updateTeam,
};