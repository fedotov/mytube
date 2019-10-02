import { IOptions } from './IOptions';

export interface IRequestOptions extends IOptions {
    uri: string;
    method: string;
    resolveWithFullResponse: boolean;
}
