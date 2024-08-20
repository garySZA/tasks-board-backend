import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../models';
import { HttpStatusCode, ResponseMessage } from '../types';

export const errorHandler = ( err: Error, req: Request, res: Response, _next: NextFunction ) => {
    
    if( err instanceof CustomError ){
        return res.status( err.statusCode ).json({
            msg: err.message
        });
    }

    console.error( err );

    return res.status( HttpStatusCode.INTERNAL_SERVER_ERROR ).json({
        msg: ResponseMessage.INTERNAL_SERVER_ERROR
    });
};