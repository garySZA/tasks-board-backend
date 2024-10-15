import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { db } from '../db';
import { Project } from './Project';

class Card extends Model<InferAttributes<Card>, InferCreationAttributes<Card>> {
    declare idCard: CreationOptional<number>;
    declare cardTitle: string;
    declare description: string;
    declare status: CreationOptional<0 | 1 | 2 | 3 | 4 | 5>;
    declare idProject: number;
    declare assignedTo: number;
    declare columnPosition: CreationOptional<number>;
}

Card.init(
    {
        idCard: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        cardTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
        idProject: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'project',
                key: 'idProject',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        assignedTo: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'idUser',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        columnPosition: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize: db,
        tableName: 'card',
    }
);

Card.belongsTo(Project, { foreignKey: 'idProject' });
Project.hasMany(Card, { foreignKey: 'idProject' });
export { Card };
