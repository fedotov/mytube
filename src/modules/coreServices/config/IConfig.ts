
export interface IConfig {
    // tslint:disable-next-line:no-any
    get(keyPath: string): any;
    // tslint:disable-next-line:no-any
    set(keyPath: string, value: any): void;
}
