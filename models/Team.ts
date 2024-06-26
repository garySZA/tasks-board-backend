import { InferAttributes, InferCreationAttributes, Model, CreationOptional, DataTypes } from 'sequelize';
import { db } from '../db';
// import { User } from './User';
// import { UserHasTeam } from './UserHasTeam';

class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
    declare idTeam: CreationOptional<number>;
    declare nameTeam: string;
    declare description: string;
    declare status: 1 | 0;
    declare creatorId: number;
}

Team.init({
    idTeam: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nameTeam: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: true
    },

    status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1
    },

    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'idUser'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}, {
    sequelize: db,
    tableName: 'team',
    timestamps: true,
});

// Team.belongsToMany( User, { through: UserHasTeam, foreignKey: 'idTeam', as: 'users' } );

export { Team };