import { Router } from 'express';

import { assignTask, createTask, deleteTask, getTaskById, getTasksByColumnId, getTasksByProjectId, reOpenTask, updateTask, updateTaskStatus } from '../controllers';
import { errorHandler, isUserAssignedToTask, isUserIntoTeam, isUserToAssignValid, isUserValidToCards, isValidElement, validateFields, validateJWT } from '../middlewares';
import { check } from 'express-validator';
import { ResponseMessage } from '../types';
import { isCardNameUnique } from '../middlewares';

const taskRouter = Router();
const baseUrl = '/:id/tasks';

taskRouter.use( validateJWT );

taskRouter.get(`${ baseUrl }/`, [
    isUserValidToCards,
    validateFields
], getTasksByProjectId);

//TODO: validar que el campo column este en el rango de 1 a 5
taskRouter.get(`${ baseUrl }/column`, [
    isUserValidToCards,
    validateFields
], getTasksByColumnId);

taskRouter.get(`${ baseUrl }/:idTask`, [
    isUserValidToCards,
    validateFields
], getTaskById);

taskRouter.post(`${ baseUrl }/`, [
    check('cardTitle', ResponseMessage.FIELD_IS_REQUIRED).notEmpty(),
    check('cardTitle', ResponseMessage.MIN_LENGTH + '6 letras').isLength({ min: 6}),
    check('description', ResponseMessage.FIELD_IS_REQUIRED).notEmpty(),
    check('description', ResponseMessage.MIN_LENGTH + '6 letras').isLength({ min: 6}),
    check('status', ResponseMessage.FIELD_IS_REQUIRED).notEmpty(),
    check('status', ResponseMessage.VALID_NUMBER).isNumeric(),
    check('status', ResponseMessage.NUMBER_IN_RANGE + '1 a 5').isInt({ min: 1, max: 5 }),
    isValidElement('id', 'project'),
    isUserValidToCards,
    isCardNameUnique,
    validateFields
], createTask);

taskRouter.put(`${ baseUrl }/:idTask`, [
    isCardNameUnique,
    isUserValidToCards,
    validateFields
], updateTask);

taskRouter.delete(`${ baseUrl }/:idTask`, [], deleteTask);

taskRouter.put(`${ baseUrl }/:idTask/changeStatus`, [
    check('status', ResponseMessage.FIELD_IS_REQUIRED).notEmpty(),
    check('status', ResponseMessage.VALID_NUMBER).isNumeric(),
    check('status', ResponseMessage.NUMBER_IN_RANGE + '1 a 5').isInt({ min: 1, max: 5 }),
    isValidElement( 'idTask', 'card' ),
    isUserValidToCards,
    validateFields
], updateTaskStatus);

taskRouter.put(`${ baseUrl }/:idTask/assignTask/`, [
    isValidElement( 'id', 'project' ),
    isValidElement( 'idTask', 'card' ),
    isUserToAssignValid,
    isUserIntoTeam,
    isUserAssignedToTask,
    isUserValidToCards,
    validateFields
], assignTask);

taskRouter.put(`${ baseUrl }/:idTask/reopen`, [
    isUserValidToCards,
    validateFields
], reOpenTask);

taskRouter.use( errorHandler );

export { taskRouter };