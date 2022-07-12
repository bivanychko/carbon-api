import {Request, Response, NextFunction} from 'express';

import {UserService} from '../services';

export class AuthController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await this.userService.login();

            res.send(token);
        } catch(e) {
            next(e);
        }
    }
}
