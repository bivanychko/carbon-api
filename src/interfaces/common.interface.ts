import {Express} from 'express';
import {Server} from 'http';

export interface ServerConfiguration {
    server: Server;
    app: Express;
}

export interface ServerConfig {
    port: number;
}

export interface JwtPayload {
    id: string;
}
