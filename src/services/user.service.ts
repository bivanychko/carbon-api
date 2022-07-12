import {sign} from 'jsonwebtoken';

import {UserDataSource} from '../datasources';
import {JwtPayload} from '../interfaces';
import {loadJwtPrivateKey} from '../helpers';
import {NotFoundError} from '../errors';

export class UserService {
    private readonly dataSource: UserDataSource;

    constructor(dataSource: UserDataSource) {
        this.dataSource = dataSource;
    }

    login(userId: string): string {
        const user = this.dataSource.getUser(userId);
        if (user) {
            return this.signToken({id: userId});
        }

        const availableUserIds = this.dataSource.getUserIds();

        throw new NotFoundError(
            `User with id ${userId} does not exist. Use one of following: ${availableUserIds.toString()}`
        );
    }

    private signToken(payload: JwtPayload): string {
        const privateKey = loadJwtPrivateKey(`../../keys/jwtRS256.key`);

        return `Bearer ${sign(payload, privateKey, {algorithm: 'RS256'})}`;
    }
}
