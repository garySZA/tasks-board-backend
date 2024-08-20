import { Router } from 'express';

import { login, register, renew } from '../controllers';
import { errorHandler, validateFields, validateJWT } from '../middlewares';
import { check } from 'express-validator';
import { isUniqueField } from '../helpers';

export const authRouter = Router();

authRouter.post('/login', [
    check('email', 'El email es obligatorio' ).not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

authRouter.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name', 'El nombre debe tener al menos 3 caracteres').isLength({ min: 3 }),
    check('email', 'El email es obligatorio' ).not().isEmpty(),
    check('email', 'El email no es valido' ).isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('email').custom( ( value ) => isUniqueField( value, 'email' ) ),
    validateFields
], register);

authRouter.post('/renew', [
    validateJWT
], renew);

authRouter.use( errorHandler );