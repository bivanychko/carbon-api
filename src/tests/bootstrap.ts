import { ConfigManager } from "../common";
import { AuthController, CarbonController } from "../controllers";
import { CarbonDataSource, UserDataSource } from "../datasources";
import { ServerConfiguration } from "../interfaces";
import Server from "../server";
import { CarbonService, UserService } from "../services";

export const start = (): ServerConfiguration => {
  const configManager = new ConfigManager();

  const userDataSource = new UserDataSource([
    { id: "e3e897ff-8376-4bcd-bede-51e4c1b10762" },
    { id: "cc027733-9323-4cba-abad-c46d02e1c5f3" },
  ]);
  const carbonDataSource = new CarbonDataSource([
    {
      id: "1",
      country: "Ukraine",
      status: "owned",
      owner: "e3e897ff-8376-4bcd-bede-51e4c1b10762",
    },
    {
      id: "2",
      country: "Ukraine",
      status: "owned",
      owner: "e3e897ff-8376-4bcd-bede-51e4c1b10762",
    },
    {
      id: "3",
      country: "Spain",
      status: "available",
      owner: null,
    },
  ]);

  const userService = new UserService(userDataSource);
  const carbonService = new CarbonService(carbonDataSource, userDataSource);

  const authController = new AuthController(userService);
  const carbonController = new CarbonController(carbonService);

  return new Server(carbonController, authController, configManager).start();
};
