import { NextFunction, Request, Response } from 'express';
import { TTableNamesDB } from '../types';
import { findElementById } from '../helpers';

const isValidElement = ( param: string, table: TTableNamesDB ) => {
    return async ( req: Request, res: Response, next: NextFunction ) => {
        const id = req.params[param];
            
        const element = await findElementById( +id, table, false );

        if( !element ) {
            return res.status( 400 ).json({
                msg: 'El elemento no existe'
            });
        }

        if( element.status === 0 ){
            return res.status( 400 ).json({
                msg: 'El elemento está eliminado'
            });
        }

        next();
    };
};

export { isValidElement };