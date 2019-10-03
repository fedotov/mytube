import { get, merge } from 'lodash';
import * as request from 'request-promise';

import { Response } from 'request';
import { IConfig, ILogger } from '../node-services';
import { IOptions } from './IOptions';
import { IRequestOptions } from './IRequestOptions';
import { IResponse } from './IResponse';

/**
 * Single point to make external http requests.
 */
export class HttpClient {

    private readonly httpTimeOut: number;
    private readonly maxSockets: number;
    private config: IConfig;
    private logger: ILogger;

    constructor(config: IConfig, logger: ILogger) {
        this.config = config;
        this.logger = logger;

        this.httpTimeOut = <number> this.config.get('server:httpTimeOut');
        this.maxSockets = <number> this.config.get('server:maxSockets');
    }

    public async get(uri: string, options?: IOptions): Promise<IResponse> {
        const requestOptions = <IRequestOptions> merge({uri, method: 'GET'}, this.defaultOptions(options), options);

        return this.httpRequest(requestOptions);
    }

    public async post(uri: string, options: IOptions): Promise<IResponse> {
        const requestOptions = <IRequestOptions> merge({uri, method: 'POST'}, this.defaultOptions(options), options);

        return this.httpRequest(requestOptions);
    }

    public async put(uri: string, options: IOptions): Promise<IResponse> {
        const requestOptions = <IRequestOptions> merge({uri, method: 'PUT'}, this.defaultOptions(options), options);

        return this.httpRequest(requestOptions);
    }

    private defaultOptions(options: IOptions): IOptions {
        return {
            encoding: 'utf8',
            headers: get(options, 'headers', {}),
            timeout: <number> get(options, 'timeOut', this.httpTimeOut),
            pool: {
                maxSockets: <number> get(options, 'maxSockets', this.maxSockets),
            },
        };
    }

    private async httpRequest(requestOptions: IRequestOptions): Promise<IResponse> {
        requestOptions.resolveWithFullResponse = true; // get the full response instead of just the body
        const startTime = Date.now();

        this.logger.debug('Sending request', requestOptions);

        // tslint:disable-next-line:await-promise
        const {body, statusCode} = <Response> await request(requestOptions);

        return {body, statusCode, requestTime: Date.now() - startTime};
    }
}
