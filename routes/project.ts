import { Router } from 'express';
import { check } from 'express-validator';

import { createProject, deleteProject, getProjectById, getAllProjects, updateProject, getTeamProjects, reOpenProject } from '../controllers';
import { errorHandler, existsProjectByPk, existsProjectName, isTeamCreator, isUniqueEditedNameOfProject, validateFields, validateJWT } from '../middlewares';
import { isValidTeam } from '../helpers';

export const projectRouter = Router();

projectRouter.use( validateJWT );

projectRouter.get('/', [], getAllProjects);

//* Obtención de proyectos pertenecientes a un idTeam
projectRouter.get('/getTeamProjects/:idTeam', [], getTeamProjects);

projectRouter.get('/:id', [
    existsProjectByPk,
    validateFields
], getProjectById);

projectRouter.post('/', [
    check('nameProject', 'EL nombre del proyecto es obligatorio').notEmpty(),
    check('nameProject', 'El nombre debe contener mínimo 6 letras').isLength({ min: 6 }),
    check('idTeam', 'el identificador de equipo es obligatorio').notEmpty(),
    check('idTeam', 'el identificador de equipo debe ser un número').isNumeric(),
    check('idTeam').custom( value => isValidTeam( value, 'team' ) ),
    isTeamCreator,
    existsProjectName,
    validateFields
], createProject);

projectRouter.put('/:id', [
    check('nameProject', 'El nombre del proyecto es obligator').notEmpty(),
    check('nameProject', 'El nombre debe contener mínimo 6 letras').isLength({ min: 6 }),
    isUniqueEditedNameOfProject,
    validateFields
], updateProject);

projectRouter.delete('/:id', [
    check('idTeam', 'el identificador de equipo es obligatorio').notEmpty(),
    check('idTeam', 'el identificador de equipo debe ser un número').isNumeric(),
    check('idTeam').custom( value => isValidTeam( value, 'team' ) ),
    existsProjectByPk,
    isTeamCreator,
    validateFields
], deleteProject);

projectRouter.put('/reOpenProject/:id', [
    check('idTeam', 'el identificador de equipo es obligatorio').notEmpty(),
    check('idTeam', 'el identificador de equipo debe ser un número').isNumeric(),
    check('idTeam').custom( value => isValidTeam( value, 'team' ) ),
    existsProjectByPk,
    isTeamCreator,
    validateFields
], reOpenProject);

projectRouter.use( errorHandler );