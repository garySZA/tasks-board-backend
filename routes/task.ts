import { Router } from 'express';

import { assignTask, createTask, deleteTask, getTaskById, getTasksByProjectId, reOpenTask, updateTask, updateTaskStatus } from '../controllers';
import { isUserAssignedToTask, isUserIntoTeam, isUserToAssignValid, isUserValidToCards, isValidElement, validateFields, validateJWT } from '../middlewares';
import { check } from 'express-validator';
import { ResponseMessage } from '../types';
import { isCardNameEditedUnique, isUniqueFieldByValue } from '../helpers';

const taskRouter = Router();
const baseUrl = '/:id/tasks';

taskRouter.use( validateJWT );
// taskRouter.use( isUserValidToCards );

taskRouter.get(`${ baseUrl }/`, [
    isUserValidToCards,
    validateFields
], getTasksByProjectId);

taskRouter.get(`${ baseUrl }/:idTask`, [
    isUserValidToCards,
    validateFields
], getTaskById);

//TODO: la restricción de nombre debe aplicarse solo dentro de un proyecto, no puede existir dos tarjetas con el mismo nombre dentro de un proyecto, pero si en distintos proyectos
taskRouter.post(`${ baseUrl }/`, [
    check('cardTitle', ResponseMessage.FIELD_IS_REQUIRED),
    check('cardTitle', ResponseMessage.MIN_LENGTH + '6 letras'),
    check('cardTitle').custom(( value ) => isUniqueFieldByValue( value, 'cardTitle', 'card' )),
    check('description', ResponseMessage.FIELD_IS_REQUIRED),
    check('description', ResponseMessage.MIN_LENGTH + '6 letras'),
    isValidElement('id', 'project'),
    isUserValidToCards,
    validateFields
], createTask);

//TODO: la restricción de nombre debe aplicarse solo dentro de un proyecto, no puede existir dos tarjetas con el mismo nombre dentro de un proyecto, pero si en distintos proyectos
taskRouter.put(`${ baseUrl }/:idTask`, [
    isCardNameEditedUnique,
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

export { taskRouter };