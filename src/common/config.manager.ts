import { ServerConfig } from "../interfaces";
import { defaultPort } from "./index";

require("dotenv").config();

export class ConfigManager {
  getServerConfig(): ServerConfig {
    return {
      port: this.getAsNumber("SERVER_PORT", defaultPort),
    };
  }

  private getAsNumber(envName: string, defaultValue: number): number {
    const envValue = process.env[envName] ?? defaultValue;
    return typeof envValue === "string" ? parseInt(envValue, 10) : envValue;
  }
}
