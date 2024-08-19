import { Request, Response } from 'express';
import { Card } from '../models';
import { getOffsetQuery } from '../helpers';
import { HttpStatusCode, ResponseMessage } from '../types';

const getTasksByProjectId = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    const { pageBL, limitBL, pageTD, limitTD, pagePG, limitPG, pageQA, limitQA, pageDN, limitDN } = req.body;

    try {

        const [ backlog, todo, progress, qa, done ] = await Promise.all([
            Card.findAll({ where: { idProject: id, status: 0 }, limit: limitBL, offset: getOffsetQuery( pageBL, limitBL ) }),
            Card.findAll({ where: { idProject: id, status: 1 }, limit: limitTD, offset: getOffsetQuery( pageTD, limitTD ) }),
            Card.findAll({ where: { idProject: id, status: 2 }, limit: limitPG, offset: getOffsetQuery( pagePG, limitPG ) }),
            Card.findAll({ where: { idProject: id, status: 3 }, limit: limitQA, offset: getOffsetQuery( pageQA, limitQA ) }),
            Card.findAll({ where: { idProject: id, status: 4 }, limit: limitDN, offset: getOffsetQuery( pageDN, limitDN ) }),
        ]);

        res.json({
            projectId: id,
            backlog,
            todo,
            progress,
            qa,
            done
        });
    } catch (error) {
        console.log(error);

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            ok: false,
            msg: ResponseMessage.INTERNAL_SERVER_ERROR
        });
    }

};

const getTaskById = async ( req: Request, res: Response ) => {
    const { idTask } = req.params;
    
    try {
        
        const result = await Card.findByPk( idTask );

        if( !result ){
            return res.status( HttpStatusCode.BAD_REQUEST ).json({
                msg: ResponseMessage.NOT_FOUND
            });
        }

        res.json({
            task: result
        });
    } catch (error) {
        console.log( error );

        return res.status( HttpStatusCode.INTERNAL_SERVER_ERROR ).json({
            ok: false,
            msg: ResponseMessage.INTERNAL_SERVER_ERROR
        });
    }
};

const createTask = async ( req: Request, res: Response ) => {
    const { cardTitle, description, assignedTo } = req.body;
    const { id } = req.params;
    
    try {
        
        const card = await Card.create({ cardTitle, description, idProject: +id, assignedTo });

        res.json({
            task: card
        });
    } catch (error) {
        console.log(error);
        
        return res.status( HttpStatusCode.INTERNAL_SERVER_ERROR ).json({
            ok: false,
            msg: ResponseMessage.INTERNAL_SERVER_ERROR
        });
    }

};

const updateTask = async ( req: Request, res: Response ) => {
    const { idTask } = req.params;
    const { cardTitle, description } = req.body;
    
    try {
        
        const card = await Card.findByPk( idTask );

        if( !card ){
            return res.status( HttpStatusCode.BAD_REQUEST ).json({
                msg: ResponseMessage.NOT_FOUND
            });
        }

        await card.update({ cardTitle: cardTitle.length > 0 ? cardTitle : card.cardTitle, description: description.length > 0 ? description : card.description });

        res.json({
            task: card
        });
    } catch (error) {
        console.log(error);

        return res.status( HttpStatusCode.INTERNAL_SERVER_ERROR ).json({
            ok: false,
            msg: ResponseMessage.INTERNAL_SERVER_ERROR
        });
    }

};

const deleteTask = async ( req: Request, res: Response ) => {
    const { idTask } = req.params;
    
    try {
        
        const card = await Card.findByPk( idTask );

        if( !card ){
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                msg: ResponseMessage.NOT_FOUND
            });
        }

        await card.update({ status: 0 });

        res.json({
            taskDeleted: card
        });
    } catch (error) {
        console.log(error);

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            ok: false,
            msg: ResponseMessage.INTERNAL_SERVER_ERROR
        });
    }

};

const updateTaskStatus = async ( req: Request, res: Response ) => {
    const { idTask } = req.params;
    const { status } = req.body;
    
    try {
        
        const card = await Card.findByPk( idTask );

        if( !card ){
            return res.status( HttpStatusCode.BAD_REQUEST ).json({
                msg: ResponseMessage.NOT_FOUND
            });
        }

        if( card.status === status ){
            return res.json({
                task: card
            });
        }

        await card.update({ status });

        res.json({
            task: card
        });
    } catch (error) {
        console.log(error);

        return res.status( HttpStatusCode.INTERNAL_SERVER_ERROR ).json({
            ok: false,
            msg: ResponseMessage.INTERNAL_SERVER_ERROR
        });
    }

};

const assignTask = async ( req: Request, res: Response ) => {
    const { idTask } = req.params;
    const { idUser } = req.body;

    try {
        
        const card = await Card.findByPk( idTask );

        if( !card ){
            return res.status( HttpStatusCode.BAD_REQUEST ).json({
                msg: ResponseMessage.NOT_FOUND
            });
        }

        await card.update({ assignedTo: idUser });

        res.json({
            task: card
        });
    } catch (error) {
        console.log(error);

        return res.status( HttpStatusCode.INTERNAL_SERVER_ERROR ).json({
            ok: false,
            msg: ResponseMessage.INTERNAL_SERVER_ERROR
        });
    }
};

const reOpenTask = async ( req: Request, res: Response ) => {
    const { idTask } = req.params;

    try {
        
        const card = await Card.findByPk( idTask );

        if( !card ){
            return res.status( HttpStatusCode.BAD_REQUEST ).json({
                msg: ResponseMessage.NOT_FOUND
            });
        }

        if( card.status !== 0 ){
            return res.json({
                task: card
            });
        }

        await card.update({ status: 1 });

        res.json({
            task: card
        });
    } catch (error) {
        console.log(error);

        return res.status( HttpStatusCode.INTERNAL_SERVER_ERROR ).json({
            ok: false,
            msg: ResponseMessage.INTERNAL_SERVER_ERROR
        });
    }

};

export { 
    assignTask,
    createTask,
    deleteTask,
    getTaskById,
    getTasksByProjectId,
    reOpenTask,
    updateTask,
    updateTaskStatus  
};