import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields, validateJWT } from '../middlewares';
import { createTeam, deleteTeam, getTeam, getTeams, updateTeam } from '../controllers';

export const teamRoutes = Router();

    teamRoutes.use( validateJWT );

    //* GET ALL TEAMS
    teamRoutes.get('/', [
        
    ], getTeams);

    //* GET TEAM BY ID
    teamRoutes.get('/:id', [
        
    ], getTeam);

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