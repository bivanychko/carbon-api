import {sign} from 'jsonwebtoken';

import {UserDataSource} from '../datasources';
import {JwtPayload} from '../interfaces';
import {loadJwtPrivateKey} from '../common';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
    private readonly dataSource: UserDataSource;

    constructor(dataSource: UserDataSource) {
        this.dataSource = dataSource;
    }

    login(): string {
        const id = uuidv4();
        const token = this.signToken({id});

        this.dataSource.addUser({id, token});

        return token;
    }

    private signToken(payload: JwtPayload): string {
        const privateKey = loadJwtPrivateKey(`../../keys/jwtRS256.key`);

        return `Bearer ${sign(payload, privateKey, {algorithm: 'RS256'})}`;
    }
}
