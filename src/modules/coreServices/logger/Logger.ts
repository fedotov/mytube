import { forEach } from 'lodash';
import { format } from 'util';
import { LogLevel } from './LogLevel';
import { LogLevelInfo } from './LogLevelInfo';

const levels = {
    [LogLevel.off]: new LogLevelInfo(6, true, 'OFF'),
    [LogLevel.error]: new LogLevelInfo(5, false, 'ERROR'),
    [LogLevel.warn]: new LogLevelInfo(4, false, 'WARN'),
    [LogLevel.info]: new LogLevelInfo(3, false, 'INFO'),
    [LogLevel.debug]: new LogLevelInfo(2, false, 'DEBUG'),
    [LogLevel.trace]: new LogLevelInfo(1, false, 'TRACE'),
};

/**
 * Makes logging to stdout in format to support Elastic ELK in TC.
 */
export class Logger {

    private defaultFields;
    private logger: Function;
    private logLevel: LogLevelInfo;

    /**
     * Sets log level and default fields
     * @param logLevel - e.g. INFO
     * @param [defaultFields] - Fields that will be used for every log call
     */
    constructor(logLevel: string = 'off', defaultFields: object = {}) {
        const logLevelEnum = <LogLevel> logLevel.toLowerCase();

        if (logLevelEnum != null) {
            this.logLevel = levels[logLevelEnum];
        } else {
            this.logLevel = levels.off;
        }

        forEach(levels, (options: LogLevelInfo, level: LogLevel) => {
            if (level === LogLevel.off) {
                return;
            }

            levels.off.enabled = false;
            levels[level].enabled = this.logLevel.level <= options.level;
        });

        this.defaultFields = defaultFields || {};

        this.logger = <Function> console.log.bind(console);
    }

    /**
     * Logs traces messages
     *
     * @param args - All passed arguments which need to log
     * @return void
     */
    public trace(...args): void {
        const level = levels.trace;
        if (level.enabled) {
            this.log(level.levelType, ...args);
        }
    }

    /**
     * Logs debug messages
     *
     * @param args - All passed arguments which need to log
     * @return void
     */
    public debug(...args): void {
        const level = levels.debug;
        if (level.enabled) {
            this.log(level.levelType, ...args);
        }
    }

    /**
     * Logs info messages
     *
     * @param args - All passed arguments which need to log
     * @return void
     */
    public info(...args): void {
        const level = levels.info;
        if (level.enabled) {
            this.log(level.levelType, ...args);
        }
    }

    /**
     * Logs warning messages
     *
     * @param args - All passed arguments which need to log
     * @return void
     */
    public warn(...args): void {
        const level = levels.warn;
        if (level.enabled) {
            this.log(level.levelType, ...args);
        }
    }

    /**
     * Logs error messages
     *
     * @param args - All passed arguments which need to log
     * @return void
     */
    public error(...args): void {
        const level = levels.error;
        if (level.enabled) {
            this.log(level.levelType, ...args);
        }
    }

    /**
     * Returns new instance of logger with extended default fields
     *
     * @param fields - defaultFields Fields that will be used for every log call
     * @return New instance of logger
     */
    public child(fields: object): Logger {
        return new Logger(this.logLevel.levelType, {...this.defaultFields, ...fields});
    }

    /**
     * Logs messages by provided type
     * @param type - Level of logged messages
     * @param args - All other arguments
     *
     * @return void
     */
    private log(type: string, ...args): void {
        const coreFields = {
            timestamp: new Date().toISOString(),
            logLevel: type,
            message: format.apply(null, args),
        };

        this.logger.call(null, JSON.stringify({...this.defaultFields, ...coreFields}));
    }

}
