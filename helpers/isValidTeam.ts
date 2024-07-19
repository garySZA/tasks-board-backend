import { TResource, TTableNamesDB } from '../types';
import { findElementById } from './queries';

const isValidTeam = async ( value: number, table: TTableNamesDB ) => {
    
    const resource: TResource = await findElementById( value, table );
    
    if( !resource ){
        throw new Error('El recurso no existe');
    }

    if( resource?.status !== 1 ){
        throw new Error('El equipo está deshabilitado');
    }
    
};

export { isValidTeam };