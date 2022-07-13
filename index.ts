import Server from './src/server';

import {CarbonController, AuthController} from './src/controllers';
import {UserService, CarbonService} from './src/services';
import {UserDataSource, CarbonDataSource} from './src/datasources';
import {ConfigManager} from './src/common';

const configManager = new ConfigManager();

const userDataSource = new UserDataSource([
    {id: '2bb2cdfc-891d-4cb6-b604-4e39d8d3a24b'},
    {id: 'bf87e12d-a67c-4764-8e02-4196cffec364'},
]);
const carbonDataSource = new CarbonDataSource([
    {
        id: '1',
        country: 'Ukraine',
        status: 'owned',
        owner: '2bb2cdfc-891d-4cb6-b604-4e39d8d3a24b',
    },
    {
        id: '2',
        country: 'Ukraine',
        status: 'owned',
        owner: '2bb2cdfc-891d-4cb6-b604-4e39d8d3a24b',
    },
    {
        id: '3',
        country: 'Spain',
        status: 'available',
        owner: null,
    },
]);

const userService = new UserService(userDataSource);
const carbonService = new CarbonService(carbonDataSource, userDataSource);

const authController = new AuthController(userService);
const carbonController = new CarbonController(carbonService);

new Server(carbonController, authController, configManager).start();

process.on('unhandledRejection', (error: Error) => {
    console.error('Unhandled Promise Rejection was catched');
    console.error({
        message: error.message,
        stack: error.stack,
    });
});
