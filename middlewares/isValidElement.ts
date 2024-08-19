import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode, ResponseMessage, TTableNamesDB } from '../types';
import { findElementById } from '../helpers';

const isValidElement = ( param: string, table: TTableNamesDB ) => {
    return async ( req: Request, res: Response, next: NextFunction ) => {
        const id = req.params[param];
            
        const element = await findElementById( +id, table, false );

        if( !element ) {
            return res.status( HttpStatusCode.NOT_FOUND ).json({
                msg: ResponseMessage.NOT_FOUND
            });
        }

        if( element.status === 0 ){
            return res.status( HttpStatusCode.BAD_REQUEST ).json({
                msg: ResponseMessage.RESOURCE_IS_DELETED
            });
        }

        next();
    };
};

export { isValidElement };