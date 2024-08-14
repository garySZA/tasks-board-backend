import { Router } from 'express';

import { assignTask, createTask, deleteTask, getTaskById, getTasksByProjectId, reOpenTask, updateTask, updateTaskStatus } from '../controllers';
import { isUserIntoTeam, isUserToAssignValid, isValidElement, validateFields, validateJWT } from '../middlewares';

const taskRouter = Router();
const baseUrl = '/:id/tasks';

taskRouter.use( validateJWT );

taskRouter.get(`${ baseUrl }/`, [], getTasksByProjectId);

taskRouter.get(`${ baseUrl }/:idTask`, [], getTaskById);

taskRouter.post(`${ baseUrl }/`, [], createTask);

taskRouter.put(`${ baseUrl }/:idTask`, [], updateTask);

taskRouter.delete(`${ baseUrl }/:idTask`, [], deleteTask);

//TODO: validación para que status sea diferente de 0,
// TODO: validación para que status esté entre 1 a 5
taskRouter.put(`${ baseUrl }/:idTask/changeStatus`, [], updateTaskStatus);

//TODO: validar que el usuario no esté asignado a la tarea
taskRouter.put(`${ baseUrl }/:idTask/assignTask/`, [
    isValidElement( 'id', 'project' ),
    isValidElement( 'idTask', 'card' ),
    isUserToAssignValid,
    isUserIntoTeam,
    validateFields
], assignTask);

taskRouter.put(`${ baseUrl }/:idTask/reopen`, [], reOpenTask);

export { taskRouter };