import { NextFunction, Request, Response } from 'express';
import { Card } from '../models';
import { HttpStatusCode, ResponseMessage } from '../types';

const isUserAssignedToTask = async ( req: Request, res: Response, next: NextFunction ) => {
    const { idUser } = req.body;
    const { idTask } = req.params;
    
    try {
        const task = await Card.findByPk( idTask );

        if( task?.assignedTo === idUser ){
            return res.status( HttpStatusCode.BAD_REQUEST ).json({
                msg: ResponseMessage.IS_USER_ASSIGNED_TO_TASK
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status( HttpStatusCode.INTERNAL_SERVER_ERROR ).json({
            msg: ResponseMessage.INTERNAL_SERVER_ERROR
        });
    }
};
export { isUserAssignedToTask };