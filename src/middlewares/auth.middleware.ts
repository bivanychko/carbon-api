import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";

import { jwtPublicKeyPath, verifyJwtSignatureAlgorithm } from "../common";
import { UnAuthorizedError } from "../errors";
import { loadJwtPublicKey } from "../helpers";
import { JwtPayload } from "../interfaces";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  if (path === "/login") return next();

  const authHeaderValue = req.header("Authorization");

  if (!authHeaderValue) {
    throw new UnAuthorizedError(`Authorization header not found.`);
  }

  if (!authHeaderValue.startsWith("Bearer")) {
    throw new UnAuthorizedError(`Authorization header is not of type 'Bearer'.`);
  }

  const jwt = authHeaderValue.split("Bearer ")[1];

  const parts = jwt ? jwt.split(".") : "";
  if (parts.length !== 3)
    throw new UnAuthorizedError(
      `Authorization header value must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
    );

  const publicKey = loadJwtPublicKey(jwtPublicKeyPath);

  try {
    verify(jwt, publicKey, { algorithms: [verifyJwtSignatureAlgorithm] });
  } catch (e) {
    throw new UnAuthorizedError("Invalid Jwt signature");
  }

  const { id } = decode(jwt, { json: true }) as JwtPayload;

  res.locals.userId = id;

  next();
};
