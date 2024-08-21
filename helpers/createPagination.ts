import { getOffsetQuery } from './getOffsetQuery';

export const createPagination = ( limit: string = '5', page: string = '1' ) => {

    const limitValue = parseInt( limit ) ? parseInt( limit ) : 5;
    const pageValue = parseInt( page ) ? parseInt( page ) : 1;

    return {
        limit: limitValue,
        offset: getOffsetQuery( pageValue, limitValue )
    };
};