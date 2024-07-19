import { Team, User } from '../models';
import { TTableNamesDB } from '../types';

const existsElementByPKParam = async ( id: number, tableName: TTableNamesDB ) => {
    let resource: User | Team | null = null;
    
    switch ( tableName ) {
        case 'user':
            resource = await User.findByPk( id );

            break;

        case 'team':
            resource = await Team.findByPk( id );

            break;
    
        default:
            break;
    }

    if( !resource ){
        throw new Error('El recurso no existe');
    }
};

export {
    existsElementByPKParam
};