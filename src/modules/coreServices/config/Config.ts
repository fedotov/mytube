import { existsSync } from 'fs';
import * as nconf from 'nconf';
import { IConfig } from './IConfig';

/**
 * Stores all project configuration. Configuration sources are:
 * - config/config.json;
 * - environment variables;
 * - command line arguments.
 *
 * To override property via env variable or via cli argument require to replace
 * ":" to "_" in it's path and pass it accordingly, for example passing
 * db_host=test will override configuration property db.test.
 */
export class Config implements IConfig {
    private config: nconf.Provider;

    constructor(configPath: string) {
        if (configPath !== null && configPath !== undefined && !existsSync(configPath)) {
            throw new Error(`File does not exist: '${configPath}'`);
        }
        this.config = nconf
            .argv()
            .env({ separator: '_' })
            .file({ file: configPath });
    }

    /**
     * Retrieves configuration property value.
     */
    // tslint:disable-next-line:no-any
    public get(keyPath: string): any {
        return this.config.get(keyPath);
    }

    /**
     * Set new configuration property value.
     */
    // tslint:disable-next-line:no-any
    public set(keyPath: string, value: any): void {
        this.config.set(keyPath, value);
    }
}
