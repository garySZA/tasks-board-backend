import { NextFunction, Request, Response } from 'express';
import { existsElementByParameter } from '../helpers';

const existsProjectName = async ( req: Request, res: Response, next: NextFunction ) => {
    const { nameProject } = req.body;

    try {
        
        const result = await existsElementByParameter( nameProject, 'nameProject', 'project' );

        if( result ){
            return res.status( 400 ).json({
                msg: 'El nombre del proyecto ya existe'
            });
        }

    } catch (error) {
        return res.status( 400 ).json({
            msg: 'Contacte con el administrador'
        });
    }

    next();
};

export { existsProjectName };