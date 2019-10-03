/**
 * Base class for web server errors.
 */
export abstract class HttpError extends Error {
    constructor(public name: string, public statusCode: number, message: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}
