import {Request, Response, NextFunction} from 'express';

import {UserService} from '../services';
import {validateLoginInput} from '../helpers';

export class AuthController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            validateLoginInput(req.body);

            const token = await this.userService.login(req.body.id);

            res.send(token);
        } catch(e) {
            next(e);
        }
    }
}
