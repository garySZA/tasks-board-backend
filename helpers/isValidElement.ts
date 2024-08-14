import { TResource, TTableNamesDB } from '../types';
import { findElementById } from './queries';

//* Verifica si un elemento existe y si su status están en 0 ( eliminado )
const isValidElement = async ( id: number, table: TTableNamesDB ) => {
    const element: TResource = await findElementById( id, table );

    if( !element ){
        throw new Error('El recurso no existe');
    }

    if( element.status === 0 ) {
        throw new Error('El recurso está eliminado');
    }
};

export { isValidElement };