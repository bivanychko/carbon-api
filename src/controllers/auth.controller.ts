import { NextFunction, Request, Response } from "express";

import { validateLoginInput } from "../helpers";
import { UserService } from "../services";

export class AuthController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  login(req: Request, res: Response, next: NextFunction) {
    try {
      validateLoginInput(req.body);

      const response = this.userService.login(req.body.id);

      res.send(response);
    } catch (e) {
      next(e);
    }
  }
}
