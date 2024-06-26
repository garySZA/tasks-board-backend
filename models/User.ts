import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import { db } from '../db';
// import { Team } from './Team';
// import { UserHasTeam } from './UserHasTeam';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare idUser: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare status: CreationOptional<number>;
    declare image: CreationOptional<string>;
    declare role: CreationOptional<string>;

}

User.init({
    idUser: {
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
    },

    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER'
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

// User.belongsToMany( Team, { through: UserHasTeam, foreignKey: 'idUser', as: 'teams' } );

export { User };