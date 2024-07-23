import { Request, Response } from 'express';
import { Project } from '../models';

const getAllProjects = async ( req: Request, res: Response ) => {
    try {
        
        const projects = await Project.findAll();

        res.json({
            projects,
            count: projects.length
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
};

const getTeamProjects = async ( req: Request, res: Response ) => {
    const { idTeam } = req.params;
    
    try {
        
        const projects = await Project.findAll({ where: { idTeam } });

        res.json({
            projects,
            count: projects.length
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
};

const getProjectById = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    
    try {
        const project = await Project.findByPk( id );
        
        res.json({
            project
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
    
};

const createProject = async ( req: Request, res: Response ) => {
    const { nameProject, idTeam } = req.body;
    
    try {
        
        const newProject = await Project.create({ nameProject, idTeam });

        res.json({
            newProject
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }

};

const updateProject = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    const { nameProject } = req.body;
    
    try {
        
        let project = await Project.findByPk( id );
        
        if( !project ){
            return res.status(400).json({
                msg: 'Proyecto no encontrado'
            });
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
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
};

const deleteProject = async ( req: Request, res: Response ) => {
    const { id } = req.params;

    try {
        const project = await Project.findByPk( id );

        if( !project ){
            return res.status(400).json({
                msg: 'Proyecto no encontrado'
            });
        }

        const projectDeleted = await project.update({ status: 0 });

        res.json({
            projectDeleted
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
};

const reOpenProject = async ( req: Request, res: Response ) => {
    const { id } = req.params;

    try {
        const project = await Project.findByPk( id );

        if( !project ){
            return res.status(400).json({
                msg: 'Proyecto no encontrado'
            });
        }

        const projectReopened = await project.update({ status: 1 });

        res.json({
            projectReopened
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
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