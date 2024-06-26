import { Team, User, UserHasTeam } from '../models';
import { TTableNamesDB } from '../types';

const existsElementByParameter = async ( value: number, parameter: string, table: TTableNamesDB ) => {
    let resource: User | Team | UserHasTeam | null = null;
    
    switch ( table ) {
        case 'user':
            resource = await User.findOne({ where: { [parameter]: value }});
            break;

        case 'team':
            
            break;
            
        case 'userHasTeam':
            resource = await UserHasTeam.findOne({ where: { [parameter]: value }});
            break;
    
        default:
            break;
    }

    if( resource ) {
        throw new Error('El elemento ya se encuentra registrado');
    }

};

export { existsElementByParameter };