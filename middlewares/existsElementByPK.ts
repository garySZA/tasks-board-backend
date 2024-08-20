import { NextFunction, Request, Response } from 'express';
import { findElementById } from '../helpers';
import { TTableNamesDB } from '../types';
import { NotFoundError } from '../models';

const existsProjectByPk = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;
    
    try {
        await findElementById( +id, 'project' );

    } catch (error) {
        return res.status(400).json({
            msg: 'Proyecto no existe'
        });
    }
    next();
};

const existsElementByParamId = ( paramName: string, table: TTableNamesDB ) => {
    
    return async ( req: Request, res: Response, next: NextFunction ) => {

        try {
            const id = req.params[paramName];

            const result = await findElementById( +id, table, false );

            if( !result ){
                throw new NotFoundError();
            }

            next();
        } catch (error) {
            next( error );
        }
    };
};

export { 
    existsElementByParamId,
    existsProjectByPk,
};