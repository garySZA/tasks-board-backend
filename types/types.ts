import { Project, Team, User, UserHasTeam } from '../models';

export type RouteType = `${string}/${string}`;

export type RoutesType = {
    auth: RouteType;
    users: RouteType;
    teams: RouteType;
    projects: RouteType;
}

export type Dialect = 'mysql' | 'postgres' | 'mariadb' | 'mssql' | 'oracle' | 'snowflake' | 'sqlite';

export type TVariables = {
    port: number;
    baseUrl: string;
    db: {
        userDb: string;
        userDbPassword: string;
        databaseName: string;
        databaseHost: string;
        databasePort: number;
    },
    token: {
        secretJWTSeed: string;
        expiresIn: string;
    }
}

export type TTableNamesDB = 'user' | 'team' | 'userHasTeam' | 'project';

export type TResource = User | Team | Project | UserHasTeam | null;