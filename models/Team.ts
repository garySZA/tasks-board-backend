import { InferAttributes, InferCreationAttributes, Model, CreationOptional, DataTypes, ForeignKey, NonAttribute, BelongsToCreateAssociationMixin, Association } from 'sequelize';
import { db } from '../db';
import { User } from './User';

export class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
    declare idTeam: CreationOptional<number>;
    declare nameTeam: string;
    declare description: string;
    declare status: 1 | 0;
    declare creatorId: ForeignKey<User['iduser']>;

    declare creator?: NonAttribute<User>;

    declare getCreator: BelongsToCreateAssociationMixin<User>;

    static associations: {
        creator: Association<Team, User>
    };
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
            key: 'iduser'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}, {
    sequelize: db,
    tableName: 'team',
    timestamps: true
});