import { Request, Response } from 'express';
import { Team } from '../models';

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
const createTeam = async ( req: Request, res: Response ) => {
    const { nameTeam, description } = req.body;
    
    try {
        
        const team = await Team.create({ nameTeam, description, status: 1 }); 

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
    getTeams,
    getTeam,
    createTeam,
    updateTeam,
    deleteTeam
};