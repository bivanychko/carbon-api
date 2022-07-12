import Server from './src/server';

import { CarbonController } from './src/controllers';
import { ConfigManager } from './src/common';

const carbonController = new CarbonController();
const configManager = new ConfigManager();

new Server(carbonController, configManager).start();

process.on('unhandledRejection', (error: Error) => {
    console.error('Unhandled Promise Rejection was catched');
    console.error({
        message: error.message,
        stack: error.stack,
    });
});
