import { InferAttributes, InferCreationAttributes, Model, CreationOptional, DataTypes } from 'sequelize';
import { db } from '../db';

export class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
    declare idTeam: CreationOptional<number>;
    declare nameTeam: string;
    declare description: string;
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
    }
}, {
    sequelize: db,
    tableName: 'team',
    timestamps: true
});