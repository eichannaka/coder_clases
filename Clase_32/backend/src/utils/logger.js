import winston, { format } from 'winston';
import config from '../../envConfig.js';

const { timestamp, printf, colorize, prettyPrint, combine } = format;

const myLevels = {
    levels: {
      fatal: 0,
      error: 1,
      warning: 2,
      info: 3,
      http: 4,
      debug: 5,
    },
  };
  

const devLog = {
    levels: myLevels.levels,
    level: 'debug',
    format: combine(
        timestamp({
            format: 'MM-DD-YYYY HH:mm:ss'
        }),
        colorize(),
        printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`),
    ),
    transports: [
        new winston.transports.Console({ level: 'debug'}),
        // new winston.transports.File({ 
        //     filename: './logs/devErrors.log', 
        //     level: 'debug' 
        // }),
    ]
};

const prodLog = {
    levels: myLevels.levels,
    level: 'info',
    format: combine(
        timestamp({
            format: 'MM-DD-YYYY HH:mm:ss'
        }),
        colorize(),
        printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`),
    ),
    transports: [
        new winston.transports.Console({ level: 'info'}),
        new winston.transports.File({ 
            filename: './logs/prodErrors.log', 
            level: 'info' 
        }),
    ]
};

const ENV = config.NODE_ENV;
const ENV_CONFIG = ENV === 'prod' ? prodLog : devLog;

export const logger = winston.createLogger(ENV_CONFIG);

