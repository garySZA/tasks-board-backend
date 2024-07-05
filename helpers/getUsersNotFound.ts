import { User } from '../models';

export const getUsersNotFound = ( users: number[], findUsers: User[] ) => {
    if( findUsers.length > 0 ){
        const foundUserIds = findUsers.map( user => user.idUser );
        const missingUsers = users.filter( id => !foundUserIds.includes( id ));

        return missingUsers;
    } else {
        return users;
    }
};