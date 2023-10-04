import { utilities as nestWinstonModuleUtilities, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

const verboseFilter = winston.format((info) => {
  return info.level === 'verbose' ? info : false;
});

const errorFilter = winston.format((info) => {
  return info.level === 'error' ? info : false;
});

export const winstonConfig: WinstonModuleOptions = {
  levels: winston.config.npm.levels,
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
    }),
    new winston.transports.File({
      level: 'info',
      filename: 'application.log',
      dirname: 'logs',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
    }),
    new winston.transports.File({
      level: 'verbose',
      filename: 'verbose.log',
      dirname: 'logs',
      format: winston.format.combine(
        winston.format.timestamp(),
        verboseFilter(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'error.log',
      dirname: 'logs',
      format: winston.format.combine(
        winston.format.timestamp(),
        errorFilter(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
    }),
  ],
};
