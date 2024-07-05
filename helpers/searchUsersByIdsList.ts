import { User } from '../models';

export const searchUsersByIdsList = async ( usersIds: number[] ) => {
    try {
        const result = await User.findAll({
            where: {
                idUser: usersIds
            },
            attributes: ['idUser', 'name']
        });

        return result;
        
    } catch (error) {
        console.log(error);

        throw new Error('Error al buscar usuarios');
    }
};