import { Router } from 'express';

import { deleteUser, getUser, getUsers, postUser, putUser } from '../controllers';
import { errorHandler, existsElementByParamId, validateFields, validateJWT } from '../middlewares';

export const userRouter = Router();

userRouter.use( validateJWT );

userRouter.get('/', getUsers );
userRouter.get('/:idUser', getUser );
userRouter.post('/', postUser );
userRouter.put('/:idUser', putUser );
userRouter.delete('/:idUser', [
    existsElementByParamId( 'idUser', 'user' ),
    validateFields
], deleteUser );

userRouter.use( errorHandler );