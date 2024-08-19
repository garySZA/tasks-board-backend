import { Card } from '../models';
import { ResponseMessage, TTableNamesDB } from '../types';
import { TResource } from '../types/types';

const isUniqueFieldByValue = async ( value: string | number, field: string, table: TTableNamesDB, showErrorMessage: boolean = true ) => {
    let resource: TResource[] | null;
    
    switch ( table ) {
        case 'card':
            resource = await Card.findAll({ where: { [field]: value } });
            
            break;
    
        default:
            resource = null;
            break;
    }

    if( resource && showErrorMessage ){
        throw new Error( ResponseMessage.FIELD_EXIST );
    } else {
        return resource;
    }
};

export { isUniqueFieldByValue };