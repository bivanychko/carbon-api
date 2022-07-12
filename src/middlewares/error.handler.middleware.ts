import {Request, Response, NextFunction} from 'express';

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error has occurred: ${error}`);

    res.status(500).send({
        message: error.message,
        stack: error.stack,
    });
};
