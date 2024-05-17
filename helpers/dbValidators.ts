import { User } from '../models';

const isUniqueField = async ( value: string, field: string ) => {
    const query = {
        [field]: value
    };

    const existField = await User.findOne({where: query});
    
    if( existField ){
        throw new Error(`El campo ${ field } ya existe`);
    }
};

export {
    isUniqueField
};