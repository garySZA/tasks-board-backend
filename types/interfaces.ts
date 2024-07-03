import { Request } from 'express';

export interface ExampleInterface {
    user: string
}

export interface IUserAttributes {
    iduser: number;
    name: string;
    email: string;
    password: string;
    status?: number;
    image?: string;
}

export interface IRenewRequest extends Request {
    uid: number;
    name: string;
}
export interface IDecodedToken {
    uid: number;
    name: string;
}

export interface ICreateTeamRequest extends Request {
    nameTeam: string;
    description: string;
    uid: number;
}

export interface IAssignUsersToTeamRequest extends Request {
    teamId: number;
    users: number[];
}