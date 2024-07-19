import { NextFunction, Request, Response } from 'express';
import { findElementById } from '../helpers';

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

export { existsProjectByPk };