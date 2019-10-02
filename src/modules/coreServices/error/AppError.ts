/**
 * Base class for application errors.
 */
export class AppError extends Error {
    constructor (public name: string, public status: number, message: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}
