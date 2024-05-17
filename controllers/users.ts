import { Request, Response } from 'express';
import { User } from '../models';

export const getUsers = async ( req: Request, resp: Response ) => {
    const users = await User.findAll();

    resp.json({
        ok: true,
        users
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
        body,
        id
    });
};

export const deleteUser = ( req: Request, resp: Response ) => {
    const { id } = req.params;
    
    resp.json({
        msg: 'deleteUser',
        id
    });
};