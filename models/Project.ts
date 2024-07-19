import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { db } from '../db';

class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
    declare idProject: CreationOptional<number>;
    declare nameProject: string;
    declare status: CreationOptional< 1 | 0>;
    declare idTeam: number;
}

Project.init({
    idProject: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    nameProject: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
    },

    idTeam: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'team',
            key: 'idTeam'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    sequelize: db,
    tableName: 'project'
});

export { Project };