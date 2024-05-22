import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import { db } from '../db';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare iduser: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare status: CreationOptional<number>;
    declare image: CreationOptional<string>;
}

User.init({
    iduser: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },

    image: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    sequelize: db,
    tableName: 'user',
    // defaultScope: {
    //     attributes: {
    //         exclude: ['password', 'createdAt', 'updatedAt']
    //     }
    // },
    scopes: {
        withoutPassword: {
            attributes: {
                exclude: ['password']
            }
        }
    }
});