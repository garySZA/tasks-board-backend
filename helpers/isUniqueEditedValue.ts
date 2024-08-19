import { HttpStatusCode, ResponseMessage } from '../types';
import { isUniqueFieldByValue } from './isUniqueField';
import { TResource } from '../types/types';
import { NextFunction, Request, Response } from 'express';
import { Card } from '../models';

export const isCardNameEditedUnique = async (req: Request, res: Response, next: NextFunction) => {    
    const { idTask } = req.params;
    const { cardTitle } = req.body;

    const resource: TResource[] | null = await isUniqueFieldByValue( cardTitle, 'cardTitle', 'card', false );

    if( resource ){
        if( resource.length > 2 ){
            return res.status( HttpStatusCode.BAD_REQUEST ).json({
                msg: ResponseMessage.FIELD_EXIST,
                path: 'cardTitle'
            });
        }

        if( resource.length === 1 && resource[0] && resource[0] instanceof Card ){
            if( resource[0].idCard !== +idTask ){
                return res.status( HttpStatusCode.BAD_REQUEST ).json({
                    msg: ResponseMessage.FIELD_EXIST,
                    path: 'cardTitle'
                });
            }
        }

        next();
    } else {

        next();
    }
};
