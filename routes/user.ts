import { check } from 'express-validator';
import { Router } from 'express';

import { deleteUser, getUser, getUsers, postUser, putUser } from '../controllers';
import { errorHandler, existsElementByParamId, validateFields, validateJWT } from '../middlewares';
import { ResponseMessage } from '../types';

export const userRouter = Router();

userRouter.use( validateJWT );

userRouter.get('/', getUsers );
userRouter.get('/:idUser', getUser );

//TODO: validar que el email sea único
userRouter.post('/', [
    check('name', ResponseMessage.FIELD_IS_REQUIRED).notEmpty(),
    check('name', ResponseMessage.MIN_LENGTH + '7 letras').isLength({ min: 7}),
    check('email', ResponseMessage.FIELD_IS_REQUIRED).notEmpty(),
    check('email', ResponseMessage.EMAIL_VALID).isEmail(),
    check('password', ResponseMessage.FIELD_IS_REQUIRED).notEmpty(),
    check('password', ResponseMessage.MIN_LENGTH + '8 caracteres').isLength({ min: 8 }),
    validateFields
], postUser );

//TODO: validar que el email sea único
userRouter.put('/:idUser', putUser );
userRouter.delete('/:idUser', [
    existsElementByParamId( 'idUser', 'user' ),
    validateFields
], deleteUser );

userRouter.use( errorHandler );