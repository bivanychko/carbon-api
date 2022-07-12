import { Request, Response, NextFunction } from 'express';

export class CarbonController {

    test(req: Request, res: Response, next: NextFunction) {
        const id = res.locals.userId;

        res.send(id);
    }
}
