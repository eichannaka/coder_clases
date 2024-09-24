import winston from "winston";
import dotenv from "dotenv";
dotenv.config();
const entorno = process.env.NODE_ENV;
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "red",
    warning: "magenta",
    info: "cyan",
    http: "green",
    debug: "blue",
  },
};
let Logger;

if (entorno === "desarrollo") {
  Logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.simple(),
          winston.format.colorize(winston.addColors(customLevels.colors))
        ),
      }),
    ],
  });
}
if (entorno === "produccion") {
  Logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.File({
        level: "error",
        filename: "error.log",
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.prettyPrint()
        ),
      }),
    ],
  });
}

export default Logger;
