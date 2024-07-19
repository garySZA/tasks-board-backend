import { Project, Team, User, UserHasTeam } from '../models';
import { TResource, TTableNamesDB } from '../types';

const findElementById = async ( id: number, table: TTableNamesDB ) => {
    let resource: TResource = null;

    switch ( table ) {
        case 'user':
            resource = await User.findByPk( id );
            break;
    
        case 'team':
            resource = await Team.findByPk( id );
            break;

        case 'project':
            resource = await Project.findByPk( id );
            break;

        default:
            resource = null;
            break;
    }

    if( !resource ){
        throw new Error('El recurso no existe');
    }

    return resource;
};

const existsElementByParameter = async ( value: string, parameter: string, table: TTableNamesDB ) => {
    let resource: User | Team | UserHasTeam | Project | null = null;

    switch ( table ) {
        case 'user':
            resource = await User.findOne({ where: { [ parameter ]: value } });
            break;
    
        case 'team':
            resource = await Team.findOne({ where: { [ parameter ]: value } });
            break;

        case 'userHasTeam':
            resource = await UserHasTeam.findOne({ where: { [ parameter ]: value } });
            break;

        case 'project':
            resource = await Project.findOne({ where: { [ parameter ]: value } });
            break;

        default:
            resource = null;
            break;
    }

    return resource;
};

export {
    existsElementByParameter,
    findElementById,
};