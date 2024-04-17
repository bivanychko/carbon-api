import { NextFunction, Request, Response } from "express";

import { BadRequestError, NotFoundError, UnAuthorizedError } from "../errors";

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error has occurred: ${error}`);

  const response = {
    message: error.message,
  };

  if (error instanceof UnAuthorizedError) return res.status(401).send(response);
  else if (error instanceof NotFoundError) return res.status(404).send(response);
  else if (error instanceof BadRequestError) return res.status(400).send(response);

  res.status(500).send(response);
};
