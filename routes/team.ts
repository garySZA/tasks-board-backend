import { Router } from 'express';
import { check } from 'express-validator';

import { existsElementByPK, isUserAssignedToTeam, isUserBlocked, validateFields, validateJWT } from '../middlewares';
import { assignUserToTeam, createTeam, deleteTeam, getTeam, getTeamMembers, getTeams, getTeamsByCreatorId, updateTeam } from '../controllers';

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

    //* ASSIGN USER TO TEAM
    // TODO: Validar que no se pueda asignar varias veces a un usuario al mismo equipo
    teamRoutes.post('/assign', [
        check('userId', 'El campo es obligatorio').not().isEmpty(),
        check('userId', 'El campo debe ser un número positivo válido').isInt({min: 1}),
        check('userId').custom( value => existsElementByPK( value, 'user' ) ),
        isUserAssignedToTeam,
        
        check('teamId', 'El campo es obligatorio').not().isEmpty(),
        check('teamId', 'El campo debe ser un número positivo válido').isInt({min: 1}),
        check('teamId').custom( value => existsElementByPK( value, 'team' ) ),
        validateFields
    ], assignUserToTeam);

    //* GET TEAM MEMBERS
    teamRoutes.get('/getTeamMembers/:id', [], getTeamMembers);