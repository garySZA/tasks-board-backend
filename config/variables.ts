import dotenv from 'dotenv';
import { join } from 'path';
import { TVariables } from '../types';

dotenv.config({ path: join(__dirname, '../', `.env.${process.env.NODE_ENV}`) });

export const config: TVariables = {
    port: (process.env.PORT ? +process.env.PORT : 3000 ),
    baseUrl: process.env.BASE_URL || '',
    db: {
        userDb:  process.env.USER_DB || '',
        userDbPassword: process.env.USER_DB_PASSWORD || '',
        databaseName: process.env.DATABASE_NAME || '',
        databaseHost: process.env.DATABASE_HOST || '',
        databasePort: (process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 3306 ),
    },
    token: {
        secretJWTSeed: process.env.SECRET_JWT_SEED || '',
        expiresIn: process.env.EXPIRES_IN || ''
    }
};