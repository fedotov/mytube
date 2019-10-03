import { Config, HttpClient, Logger } from './node-services';

/**
 * Access point for modules/services in the application
 */
// tslint:disable-next-line:no-unnecessary-class
export class BaseApp {
    public static config: Config;
    public static logger: Logger;
    public static httpClient: HttpClient;

    public static INIT() {
        throw new Error('Override this method in your application with initialisation of config, logger and httpClient');
    }
}
