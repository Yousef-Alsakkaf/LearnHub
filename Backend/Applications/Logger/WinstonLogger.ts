import winston, { format } from 'winston';
import { Logger } from './Logger.js';
import chalk from 'chalk';

class WinstonLogger implements Logger {
    private logger: winston.Logger;

    constructor() {
        const logFormat = format.printf(({ level, message }) => {
            switch (level) {
                case 'error':
                    return chalk.red(`[ERROR] ${message}`);
                case 'warn':
                    return chalk.yellow(`[WARN] ${message}`);
                case 'info':
                    return chalk.blue(`[INFO] ${message}`);
                case 'verbose':
                case 'debug':
                    return chalk.gray(`[DEBUG] ${message}`);
                default:
                    return chalk.white(`[LOG] ${message}`);
            }
        });

        this.logger = winston.createLogger({
            level: 'verbose',
            format: logFormat,
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: '../../../logs/log.txt', level: 'info' }),
                new winston.transports.File({ filename: '../../../logs/error.txt', level: 'error' }),
            ],
        });
    }

    log(message: string): void {
        this.logger.info(message);
    }

    error(message: string): void {
        this.logger.error(message);
    }

    warn(message: string): void {
        this.logger.warn(message);
    }

    info(message: string): void {
        this.logger.info(message);
    }

    debug(message: string): void {
        this.logger.debug(message);
    }

    verbose(message: string): void {
        this.logger.verbose(message);
    }
}

export {
    WinstonLogger
}