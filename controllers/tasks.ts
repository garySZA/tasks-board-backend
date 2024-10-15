import { NextFunction, Request, Response } from 'express';
import { Card, NotFoundError } from '../models';
import { getOffsetQuery } from '../helpers';
import { Op } from 'sequelize';

const getTasksByProjectId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const {
        pageBL,
        limitBL,
        pageTD,
        limitTD,
        pagePG,
        limitPG,
        pageQA,
        limitQA,
        pageDN,
        limitDN,
    } = req.body;

    try {
        const [backlog, todo, progress, qa, done] = await Promise.all([
            Card.findAll({
                where: { idProject: id, status: 0 },
                limit: limitBL,
                offset: getOffsetQuery(pageBL, limitBL),
            }),
            Card.findAll({
                where: { idProject: id, status: 1 },
                limit: limitTD,
                offset: getOffsetQuery(pageTD, limitTD),
            }),
            Card.findAll({
                where: { idProject: id, status: 2 },
                limit: limitPG,
                offset: getOffsetQuery(pagePG, limitPG),
            }),
            Card.findAll({
                where: { idProject: id, status: 3 },
                limit: limitQA,
                offset: getOffsetQuery(pageQA, limitQA),
            }),
            Card.findAll({
                where: { idProject: id, status: 4 },
                limit: limitDN,
                offset: getOffsetQuery(pageDN, limitDN),
            }),
        ]);

        res.json({
            projectId: id,
            backlog,
            todo,
            progress,
            qa,
            done,
        });
    } catch (error) {
        next(error);
    }
};

const getTasksByColumnId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { limit = 5, page = 1, column = 1 } = req.query;
    const { id } = req.params;

    try {
        const [tasks, count] = await Promise.all([
            Card.findAll({
                where: { idProject: id, status: +column },
                limit: +limit,
                offset: getOffsetQuery(+page, +limit),
                order: [
                    ['columnPosition', 'ASC'],
                    ['createdAt', 'DESC'],
                ],
            }),
            Card.count({ where: { idProject: id, status: +column } }),
        ]);

        res.json({
            id: column,
            count,
            page: +page,
            pages: Math.ceil(count / +limit),
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    const { idTask } = req.params;

    try {
        const result = await Card.findByPk(idTask);

        if (!result) {
            throw new NotFoundError();
        }

        res.json({
            task: result,
        });
    } catch (error) {
        next(error);
    }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
    const { cardTitle, description, assignedTo, status } = req.body;
    const { id } = req.params;

    try {
        const card = await Card.create({
            cardTitle,
            description,
            idProject: +id,
            assignedTo,
            status,
        });

        await Card.increment('columnPosition', {
            by: 1,
            where: { idProject: +id, status, idCard: { [Op.ne]: card.idCard } },
        });

        res.json({
            task: card,
        });
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const { idTask } = req.params;
    const { cardTitle, description } = req.body;

    try {
        const card = await Card.findByPk(idTask);

        if (!card) {
            throw new NotFoundError();
        }

        await card.update({
            cardTitle: cardTitle.length > 0 ? cardTitle : card.cardTitle,
            description:
                description.length > 0 ? description : card.description,
        });

        res.json({
            task: card,
        });
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const { idTask } = req.params;

    try {
        const card = await Card.findByPk(idTask);

        if (!card) {
            throw new NotFoundError();
        }

        await card.update({ status: 0 });

        res.json({
            taskDeleted: card,
        });
    } catch (error) {
        next(error);
    }
};

const updateTaskStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { idTask } = req.params;
    const { status, index, userToAssign } = req.body;

    try {
        const card = await Card.findByPk(idTask);

        if (!card) {
            throw new NotFoundError();
        }

        if (card.status === status) {
            await card.update({
                columnPosition: index,
                assignedTo: userToAssign,
            });

            return res.json({
                task: card,
            });
        }

        await card.update({
            status,
            columnPosition: index,
            assignedTo: userToAssign,
        });

        res.json({
            task: card,
        });
    } catch (error) {
        next(error);
    }
};

const assignTask = async (req: Request, res: Response, next: NextFunction) => {
    const { idTask } = req.params;
    const { idUser } = req.body;

    try {
        const card = await Card.findByPk(idTask);

        if (!card) {
            throw new NotFoundError();
        }

        await card.update({ assignedTo: idUser });

        res.json({
            task: card,
        });
    } catch (error) {
        next(error);
    }
};

const reOpenTask = async (req: Request, res: Response, next: NextFunction) => {
    const { idTask } = req.params;

    try {
        const card = await Card.findByPk(idTask);

        if (!card) {
            throw new NotFoundError();
        }

        if (card.status !== 0) {
            return res.json({
                task: card,
            });
        }

        await card.update({ status: 1 });

        res.json({
            task: card,
        });
    } catch (error) {
        next(error);
    }
};

export {
    assignTask,
    createTask,
    deleteTask,
    getTaskById,
    getTasksByColumnId,
    getTasksByProjectId,
    reOpenTask,
    updateTask,
    updateTaskStatus,
};
