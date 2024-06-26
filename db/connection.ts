import { Sequelize } from 'sequelize';
import { config } from '../config';

const { db: { databaseName, userDb, userDbPassword, databaseHost, databasePort } } = config;

export const db = new Sequelize(databaseName, userDb, userDbPassword, {
    host: databaseHost,
    port: databasePort,
    dialect: 'mysql',
    timezone: '-04:00'
});