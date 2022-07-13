import {sign} from 'jsonwebtoken';

import {UserDataSource} from '../datasources';
import {JwtPayload} from '../interfaces';
import {loadJwtPrivateKey} from '../helpers';
import {NotFoundError} from '../errors';
import {jwtPrivateKeyPath, verifyJwtSignatureAlgorithm} from '../common';

export class UserService {
    private readonly usersDataSource: UserDataSource;

    constructor(usersDataSource: UserDataSource) {
        this.usersDataSource = usersDataSource;
    }

    login(userId: string): string {
        const user = this.usersDataSource.getUser(userId);
        if (user) {
            return this.signToken({id: userId});
        }

        const availableUserIds = this.usersDataSource.getUserIds();

        throw new NotFoundError(
            `User with id ${userId} does not exist. Use one of following: ${availableUserIds.toString()}`
        );
    }

    private signToken(payload: JwtPayload): string {
        const privateKey = loadJwtPrivateKey(jwtPrivateKeyPath);

        return `Bearer ${sign(payload, privateKey, {algorithm: verifyJwtSignatureAlgorithm})}`;
    }
}
