import express, {Express} from 'express';
import http, {Server} from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';

import {ConfigManager} from './common';
import {CarbonController} from './controllers';
import {ServerConfig} from './interaces';

export default class HttpServer {
    private readonly serverConfig: ServerConfig;
    private readonly carbonController: CarbonController;

    constructor(carbonController: CarbonController, configManager: ConfigManager) {
        this.carbonController = carbonController;
        this.serverConfig = configManager.getServerConfig();
    }

    start(): Server {
        const {port} = this.serverConfig;

        const app = express();
        const server = http.createServer(app);

        this._registerMiddleware(app);
        this._registerRoutes(app);
        //this._registerErrorHandler(app);

        console.log(`Listening at port ${port}`);
        server.listen(port);

        return server;
    }

    _registerRoutes(app: Express) {
        app.get('/lol', this.carbonController.test.bind(this.carbonController));
    }

    _registerMiddleware(app: Express) {
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(express.json());
        app.use(cors());
    }

    _registerErrorHandler(app: Express) {
        //app.use(errorHandler);
    }
}
