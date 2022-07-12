import {Request, Response, NextFunction} from 'express';
import {verify, decode} from 'jsonwebtoken';

import {JwtPayload} from '../interfaces';
import {loadJwtPublicKey} from '../helpers';
import {UnAuthorizedError} from '../errors';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const path = req.path;
    if (path === '/login') return next();

    const authHeaderValue = req.header('Authorization');

    if (!authHeaderValue) {
        throw new UnAuthorizedError(`Authorization header not found.`);
    }

    if (!authHeaderValue.startsWith('Bearer')) {
        throw new UnAuthorizedError(
            `Authorization header is not of type 'Bearer'.`,
        );
    }

    const jwt = authHeaderValue.split('Bearer ')[1];

    const parts = jwt ? jwt.split('.') : '';
    console.log(parts);
    console.log(parts.length);
    if (parts.length !== 3)
        throw new UnAuthorizedError(
            `Authorization header value must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
        );

    const publicKey = loadJwtPublicKey('../../keys/jwtRS256.pub');

    try {
        verify(jwt, publicKey, {algorithms: ['RS256']});
    } catch (e) {
        throw new UnAuthorizedError('Invalid Jwt signature');
    }

    const {id} = decode(jwt, {json: true}) as JwtPayload;

    res.locals.userId = id;

    next();
};
