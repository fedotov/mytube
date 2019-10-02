//type AnyType = string | boolean | number | object;

export interface IOptions {
    encoding?: string;
    headers?: object;
    timeout?: number;
    pool?: {
        maxSockets: number;
    };
    // tslint:disable-next-line:no-any
    [propName: string]: any; // any additional property. for example json: true etc
}
