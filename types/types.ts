export type RouteType = `${string}/${string}`;

export type RoutesType = {
    auth: RouteType;
    users: RouteType;
}

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