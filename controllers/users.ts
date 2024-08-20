import { NextFunction, Request, Response } from 'express';
import { User } from '../models';

export const getUsers = async ( req: Request, resp: Response, next: NextFunction ) => {
    
    try {
        const users = await User.findAll();
    
        resp.json({
            ok: true,
            users
        });
    } catch (error) {
        next( error );
    }
};

export const getUser = ( req: Request, resp: Response, next: NextFunction ) => {
    
    try {
        
        const { id } = req.params;
        
        resp.json({
            msg: 'getUser',
            id
        });
    } catch (error) {
        next( error );
    }
};

export const postUser = ( req: Request, resp: Response, next: NextFunction ) => {
    const { body } = req;
    
    try {
        
        resp.json({
            msg: 'postUser',
            body
        });
    } catch (error) {
        next( error );
    }

};

export const putUser = ( req: Request, resp: Response, next: NextFunction ) => {
    const { id } = req.params;
    const { body } = req;
    
    try {
        
        resp.json({
            msg: 'putUser',
            body,
            id
        });
    } catch (error) {
        next( error );
    }

};

export const deleteUser = async ( req: Request, resp: Response, next: NextFunction ) => {
    const { idUser } = req.params;

    try {

        const user = await User.findByPk( idUser, { attributes: ['idUser', 'name', 'email', 'status', 'image' ] } );

        await user?.update({ status: 0 });

        resp.json({
            user
        });

    } catch (error) {
        next( error );
    }

};