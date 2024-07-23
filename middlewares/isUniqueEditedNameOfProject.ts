import { NextFunction, Request, Response } from 'express';

import { existsElementByParameter } from '../helpers';
import { Project } from '../models';

const isUniqueEditedNameOfProject = async ( req: Request, res: Response, next: NextFunction ) => {
    const { nameProject } = req.body;
    const { id } = req.params;

    const result = await existsElementByParameter( nameProject, 'nameProject', 'project' );

    if ( result instanceof Project && result.idProject !== +id ){
        return res.status(400).json({
            msg: 'El nombre del proyecto ya existe'
        });
    } 
    
    next();
    
};

export { isUniqueEditedNameOfProject };