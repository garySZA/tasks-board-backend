import { InferAttributes, InferCreationAttributes, Model, CreationOptional, DataTypes } from 'sequelize';
import { db } from '../db';

export class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
    declare idTeam: CreationOptional<number>;
    declare nameTeam: string;
    declare description: string;
    declare status: 1 | 0;
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
    }
}, {
    sequelize: db,
    tableName: 'team',
    timestamps: true
});