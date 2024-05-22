import { Router } from 'express';
import { validateJWT } from '../middlewares';
import { createTeam, deleteTeam, getTeam, getTeams, updateTeam } from '../controllers';

export const teamRoutes = Router();

    //* GET ALL TEAMS
    teamRoutes.get('/', [
        validateJWT
    ], getTeams);

    //* GET TEAM BY ID
    teamRoutes.get('/:id', [
        validateJWT
    ], getTeam);

    //* CREATE TEAM
    teamRoutes.post('/', [
        validateJWT
    ], createTeam);

    //* UPDATE TEAM
    teamRoutes.put('/:id', [
        validateJWT
    ], updateTeam);

    //* DELETE TEAM
    teamRoutes.delete('/:id', [
        validateJWT
    ], deleteTeam);