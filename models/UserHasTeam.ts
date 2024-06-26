import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { db } from '../db';
import { User } from './User';
import { Team } from './Team';

class UserHasTeam extends Model<InferAttributes<UserHasTeam>, InferCreationAttributes<UserHasTeam>>{
    declare idUserHasTeam: CreationOptional<number>;
    declare idUser: ForeignKey<User['idUser']>;
    declare idTeam: ForeignKey<Team['idTeam']>;

}

UserHasTeam.init({
    idUserHasTeam: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'idUser'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },

    idTeam: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Team,
            key: 'idTeam'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
}, {
    sequelize: db,
    tableName: 'userHasTeam',
    timestamps: true,
});

UserHasTeam.belongsTo( User, { foreignKey: 'idUser', as: 'user' } );
UserHasTeam.belongsTo( Team, { foreignKey: 'idTeam', as: 'team' } );

export { UserHasTeam };