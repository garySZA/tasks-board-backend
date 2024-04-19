import { Request, Response } from 'express';

export const getUsers = ( req: Request, resp: Response ) => {
    resp.json({
        msg: 'getUsers'
    });
};

export const getUser = ( req: Request, resp: Response ) => {
    const { id } = req.params;
    
    resp.json({
        msg: 'getUser',
        id
    });
};

export const postUser = ( req: Request, resp: Response ) => {
    const { body } = req;
    
    resp.json({
        msg: 'postUser',
        body
    });
};

export const putUser = ( req: Request, resp: Response ) => {
    const { id } = req.params;
    const { body } = req;
    
    resp.json({
        msg: 'putUser',
        body
    });
};

export const deleteUser = ( req: Request, resp: Response ) => {
    const { id } = req.params;
    
    resp.json({
        msg: 'deleteUser',
        id
    });
};