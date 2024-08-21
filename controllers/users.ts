import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { InvalidQueryError, NotFoundError, User } from '../models';
import { createPagination } from '../helpers';

export const getUsers = async ( req: Request, resp: Response, next: NextFunction ) => {
    const { limit, page } = req.query;

    try {

        if( typeof limit !== 'string' ){
            throw new InvalidQueryError( 'limit' );
        }

        if( typeof page !== 'string' ){
            throw new InvalidQueryError( 'page' );
        }

        const [ users, count ] = await Promise.all([
            User.findAll({ ...createPagination( limit as string, page as string ), attributes:['idUser', 'name', 'email', 'status', 'image', 'role', 'createdAt'] }),
            User.count()
        ]);
    
        resp.json({
            count,
            page,
            pages: Math.ceil( count / +limit ),
            users
        });
    } catch (error) {
        next( error );
    }
};

export const getUser = async ( req: Request, resp: Response, next: NextFunction ) => {
    
    try {
        
        const { idUser } = req.params;

        const user = await User.findByPk( idUser, { attributes:['idUser', 'name', 'email', 'status', 'image', 'role', 'createdAt'] } );
        
        if( !user ){
            throw new NotFoundError();
        }
        
        resp.json({
            user
        });
    } catch (error) {
        next( error );
    }
};

export const postUser = async ( req: Request, resp: Response, next: NextFunction ) => {
    const { name, email, password, image } = req.body;
    
    try {
        
        const salt = bcrypt.genSaltSync();
        const validPassword = bcrypt.hashSync( String( password ), salt );

        const user = await User.create({ name, email, password: validPassword, image : image ? image : null });

        resp.json({
            newUser: user
        });
    } catch (error) {
        next( error );
    }

};

export const putUser = async ( req: Request, resp: Response, next: NextFunction ) => {
    const { idUser } = req.params;
    const { name, email, image } = req.body;
    
    try {
        
        const user = await User.findByPk( idUser, { attributes:['idUser', 'name', 'email', 'status', 'image', 'role', 'createdAt'] } );

        if( !user ){
            throw new NotFoundError();
        }

        user.update({ name: name ? name : user.name, email: email ? email : user.email, image: image ? image : user.image });

        resp.json({
            userUpdated: user
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