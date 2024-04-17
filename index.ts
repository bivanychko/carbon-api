import Server from "./src/server";
import { AuthController, CarbonController } from "./src/controllers";
import { CarbonService, UserService } from "./src/services";
import { CarbonDataSource, UserDataSource } from "./src/datasources";
import { ConfigManager } from "./src/common";
import { carbons, users } from "./src/seeds";

const configManager = new ConfigManager();

const userDataSource = new UserDataSource(users);
const carbonDataSource = new CarbonDataSource(carbons);

const userService = new UserService(userDataSource);
const carbonService = new CarbonService(carbonDataSource, userDataSource);

const authController = new AuthController(userService);
const carbonController = new CarbonController(carbonService);

new Server(carbonController, authController, configManager).start();

process.on("unhandledRejection", (error: Error) => {
    console.error("Unhandled Promise Rejection was catched");
    console.error({
        message: error.message,
        stack: error.stack,
    });
});
