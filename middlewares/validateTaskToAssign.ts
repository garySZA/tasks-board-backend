import { NextFunction, Request, Response } from 'express';
import { Project, User, UserHasTeam } from '../models';
    
//* validar que el usuario al que se pretende asignar la tarea, se encuentre inscrito en el equipo y que no este bloqueado
const isUserIntoTeam = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id: idProject } = req.params;
    const { idUser } = req.body;

    try {
        
        const project = await Project.findByPk( idProject );
        if( !project ){
            return res.status(400).json({
                msg: 'Proyecto no encontrado'
            });
        }

        const userHasTeam = await UserHasTeam.findOne({ where: { idUser, idTeam: project.idTeam } });

        if( !userHasTeam ){
            return res.status(400).json({
                msg: 'El usuario no se encuentra inscrito en el equipo'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
};

//* Validar que el idUser exista
//* Validar que el usuario no se encuentre bloqueado
const isUserToAssignValid = async ( req: Request, res: Response, next: NextFunction ) => {
    const { idUser } = req.body;

    try {
        
        const user = await User.findByPk( idUser );

        if( !user ){
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            });
        }

        if( user.status === 0 ){
            return res.status(400).json({
                msg: 'El usuario está bloqueado'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
};

export {
    isUserToAssignValid,
    isUserIntoTeam,
};