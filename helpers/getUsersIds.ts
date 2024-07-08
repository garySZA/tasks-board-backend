import { User } from '../models';

export const getUsersIds = ( users: User[] ) => {
    
    return users.map( user => user.idUser );
};