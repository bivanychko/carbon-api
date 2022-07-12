import { Request, Response, NextFunction } from 'express';

export class CarbonController {

    test(req: Request, res: Response, next: NextFunction) {
        res.send('GOOD');
    }
}
