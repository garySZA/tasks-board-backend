import { Router } from 'express';
import { check } from 'express-validator';

import { isUserBlocked, validateFields, validateJWT } from '../middlewares';
import { createTeam, deleteTeam, getTeam, getTeams, getTeamsByCreatorId, updateTeam } from '../controllers';

export const teamRoutes = Router();

    teamRoutes.use( validateJWT );
    teamRoutes.use( isUserBlocked );

    //* GET ALL TEAMS
    teamRoutes.get('/', [
        
    ], getTeams);

    //* GET TEAM BY ID
    teamRoutes.get('/:id', [
        
    ], getTeam);

    //* GET TEAMS BY CREATOR ID
    teamRoutes.get('/creator/:id', [],
        getTeamsByCreatorId
    );

    //* CREATE TEAM
    teamRoutes.post('/', [
        check('nameTeam', 'El campo es obligatorio').not().isEmpty(),
        check('nameTeam', 'El campo debe tener al menos 3 caracteres').isLength({ min: 3 }),
        check('nameTeam', 'El campo debe tener máximo 50 caracteres').isLength({ max: 50 }),
        check('nameTeam', 'El campo debe ser un texto').isString(),
        validateFields
    ], createTeam);

    //* UPDATE TEAM
    teamRoutes.put('/:id', [
        
    ], updateTeam);

    //* DELETE TEAM
    teamRoutes.delete('/:id', [
        
    ], deleteTeam);