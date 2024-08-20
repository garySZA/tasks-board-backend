import { HttpStatusCode, ResponseMessage } from '../types';

export class CustomError extends Error {
    statusCode: number;

    constructor( message: string, statusCode: number ) {
        super( message );
        this.statusCode = statusCode;
        Object.setPrototypeOf( this, CustomError.prototype );
    }
}

export class NotFoundError extends CustomError {
    constructor(){
        super( ResponseMessage.NOT_FOUND, HttpStatusCode.NOT_FOUND );
    }
}

export class ValidationError extends CustomError {
    constructor( message: string ){
        super( message, HttpStatusCode.BAD_REQUEST );
    }
}

export class UnauthorizedError extends CustomError {
    constructor(){
        super( ResponseMessage.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
    }
}