import { NextFunction, Request, Response } from 'express';
import { Card, NotFoundError, Project } from '../models';
import { db } from '../db';

const getAllProjects = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        
        const projects = await Project.findAll();

        res.json({
            projects,
            count: projects.length
        });

    } catch (error) {
        next( error );
    }
};

const getTeamProjects = async ( req: Request, res: Response, next: NextFunction ) => {
    const { idTeam } = req.params;
    
    try {
        
        const projects = await Project.findAll({ 
            attributes: [
                'idProject',
                'nameProject',
                'status',
                'createdAt',
                'idTeam',
                [ db.fn('COUNT', db.col('cards.idCard')), 'cardCount' ]
            ],
            include: [{
                model: Card,
                attributes: []
            }],
            where: { idTeam },
            group: ['project.idProject']
        });

        res.json({
            projects,
            count: projects.length
        });
    } catch (error) {
        next( error );
    }
};

const getProjectById = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;
    
    try {
        const project = await Project.findByPk( id );
        
        res.json({
            project
        });
    } catch (error) {
        next( error );
    }
    
};

const createProject = async ( req: Request, res: Response, next: NextFunction ) => {
    const { nameProject, idTeam } = req.body;
    
    try {
        
        const newProject = await Project.create({ nameProject, idTeam });

        res.json({
            newProject
        });
    } catch (error) {
        next( error );
    }

};

const updateProject = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;
    const { nameProject } = req.body;
    
    try {
        
        let project = await Project.findByPk( id );
        
        if( !project ){
            throw new NotFoundError();
        }

        if( project.nameProject === nameProject ){
            return res.json({
                project
            });
        }

        project = await project.update({ nameProject}); 

        res.json({
            project
        });
    } catch (error) {
        next( error );
    }
};

const deleteProject = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;

    try {
        const project = await Project.findByPk( id );

        if( !project ){
            throw new NotFoundError();
        }

        const projectDeleted = await project.update({ status: 0 });

        res.json({
            projectDeleted
        });
    } catch (error) {
        next( error );
    }
};

const reOpenProject = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;

    try {
        const project = await Project.findByPk( id );

        if( !project ){
            throw new NotFoundError();
        }

        const projectReopened = await project.update({ status: 1 });

        res.json({
            projectReopened
        });
    } catch (error) {
        next( error );
    }
};

export {
    createProject,
    deleteProject,
    getAllProjects,
    getProjectById,
    getTeamProjects,
    reOpenProject,
    updateProject,
};