
export interface ILogger {
    trace(...args): void;
    debug(...args): void;
    info(...args): void;
    warn(...args): void;
    error(...args): void;
    child(fields: object): ILogger;
}
