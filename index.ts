import Server from './src/server';

import {CarbonController, AuthController} from './src/controllers';
import {UserService} from './src/services';
import {UserDataSource} from './src/datasources';
import {ConfigManager} from './src/common';

const configManager = new ConfigManager();

const userDataSource = new UserDataSource([]);

const userService = new UserService(userDataSource);

const authController = new AuthController(userService);
const carbonController = new CarbonController();

new Server(carbonController, authController, configManager).start();

process.on('unhandledRejection', (error: Error) => {
    console.error('Unhandled Promise Rejection was catched');
    console.error({
        message: error.message,
        stack: error.stack,
    });
});
