import { NextFunction, Request, Response } from "express";

import { CarbonService } from "../services";

export class CarbonController {
  private readonly carbonService: CarbonService;

  constructor(carbonService: CarbonService) {
    this.carbonService = carbonService;
  }

  getCarbons(req: Request, res: Response, next: NextFunction) {
    try {
      const response = this.carbonService.getAvailableCarbons();

      res.send(response);
    } catch (e) {
      next(e);
    }
  }

  getMyCarbons(req: Request, res: Response, next: NextFunction) {
    try {
      const response = this.carbonService.getCarbonsById(res.locals.userId);

      res.send(response);
    } catch (e) {
      next(e);
    }
  }

  transferMyCarbons(req: Request, res: Response, next: NextFunction) {
    try {
      const fromUser = res.locals.userId;
      const toUser = req.params.userId;

      this.carbonService.transferMyCarbons(fromUser, toUser);

      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}
