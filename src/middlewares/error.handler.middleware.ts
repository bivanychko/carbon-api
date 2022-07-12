import {Request, Response, NextFunction} from 'express';
import {UnAuthorizedError} from '../errors';

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error has occurred: ${error}`);

    const response = {
        message: error.message,
        stack: error.stack,
    };

    if (error instanceof UnAuthorizedError) {
        return res.status(401).send(response);
    }

    res.status(500).send(response);
};
