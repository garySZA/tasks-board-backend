import { Router } from 'express';
import { check } from 'express-validator';

import { isUsersAssignedToTeam, isUserBlocked, validateFields, validateJWT, existsUsersByPksList, existsOldUsersByPksList, existsElementByPKParam, errorHandler } from '../middlewares';
import { assignUsersToTeam, createTeam, deleteTeam, getOtherUsers, getTeam, getTeamMembers, getTeams, getTeamsByCreatorId, updateTeam } from '../controllers';

export const teamRouter = Router();

    teamRouter.use( validateJWT );
    teamRouter.use( isUserBlocked );

    //* GET ALL TEAMS
    teamRouter.get('/', [
        
    ], getTeams);

    //* GET TEAM BY ID
    teamRouter.get('/:id', [
        
    ], getTeam);

    //* GET TEAMS BY CREATOR ID
    teamRouter.get('/creator/:id', [],
        getTeamsByCreatorId
    );

    //* CREATE TEAM
    teamRouter.post('/', [
        check('nameTeam', 'El campo es obligatorio').not().isEmpty(),
        check('nameTeam', 'El campo debe tener al menos 3 caracteres').isLength({ min: 3 }),
        check('nameTeam', 'El campo debe tener máximo 50 caracteres').isLength({ max: 50 }),
        check('nameTeam', 'El campo debe ser un texto').isString(),
        validateFields
    ], createTeam);

    //* UPDATE TEAM
    teamRouter.put('/:id', [
        
    ], updateTeam);

    //* DELETE TEAM
    teamRouter.delete('/:id', [
        
    ], deleteTeam);

    //* ASSIGN USERs TO TEAM
    teamRouter.post('/assign', [
        check('newUsers', 'El campo es obligatorio').not().isEmpty(),
        check('newUsers', 'El campo debe ser una lista de ids válidos').isArray(),
        check('oldUsers', 'El campo es obligatorio').not().isEmpty(),
        check('oldUsers', 'El campo debe ser una lista de ids válidos').isArray(),
        existsUsersByPksList,
        existsOldUsersByPksList,
        isUsersAssignedToTeam,
        
        check('teamId', 'El campo es obligatorio').not().isEmpty(),
        check('teamId', 'El campo debe ser un número positivo válido').isInt({min: 1}),
        check('teamId').custom( value => existsElementByPKParam( value, 'team' ) ),
        validateFields
    ], assignUsersToTeam);

    //* GET TEAM MEMBERS
    teamRouter.get('/getTeamMembers/:id', [], getTeamMembers);

    //* GET OTHER USERS
    teamRouter.get('/:id/getOtherUsers', [], getOtherUsers);

    teamRouter.use( errorHandler );