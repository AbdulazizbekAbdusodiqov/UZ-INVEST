import { utilities as nestWinstonModuleUtilitiee } from "nest-winston";
import * as winston from "winston";

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        // winston.format.label({ label: "Uz-Invest" }),
        winston.format.timestamp(),
        nestWinstonModuleUtilitiee.format.nestLike("Uz-Invest")
        // winston.format.printf(({ level, message, label, timestamp }) => {
        //   return `${timestamp} [${label}] ${level}: ${message}`;
        // })
      ),
    }),
    new winston.transports.File({
      filename: "application.log",
      level: "info",

      format: winston.format.combine(
        winston.format.label({ label: "Uz-Invest" }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.label({ label: "Uz-Invest" }),

        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
};
