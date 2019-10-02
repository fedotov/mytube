import { HttpError } from './HttpError';
/* tslint:disable:max-classes-per-file */

/**
 * Represents a BAD REQUEST error. The request could not be understood by the
 * server due to malformed syntax. The client SHOULD NOT repeat the request
 * without modifications.
 */
export class BadRequestError extends HttpError {
    constructor(message?: string) {
        super('BadRequestError', HTTPStatusCodes.BAD_REQUEST, message || 'Bad Request');
    }
}

/**
 * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or
 * has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge
 * applicable to the requested resource. See Basic access authentication and Digest access authentication.
 * 401 semantically means "unauthenticated",[35] i.e. the user does not have the necessary credentials.
 * Note: Some sites issue HTTP 401 when an IP address is banned from the website (usually the website domain)
 * and that specific address is refused permission to access a website.
 */
export class UnauthorizedError extends HttpError {
    constructor(message?: string) {
        super('UnauthorizedError', HTTPStatusCodes.UNAUTHORIZED, message || 'Unauthorized');
    }
}

/**
 * Represents a FORBIDDEN error. The server understood the request, but is refusing to
 * fulfill it. Authorization will not help and the request SHOULD NOT be repeated.
 */
export class ForbiddenError extends HttpError {
    constructor(message?: string) {
        super('ForbiddenError', HTTPStatusCodes.FORBIDDEN, message || 'Forbidden');
    }
}

/**
 * Represents a NOT FOUND error. The server has not found anything matching
 * the Request-URI. No indication is given of whether the condition is temporary
 * or permanent. The 410 (GoneError) status code SHOULD be used if the server knows,
 * through some internally configurable mechanism, that an old resource is permanently
 * unavailable and has no forwarding address.
 *
 * This error is commonly used when
 * the server does not wish to reveal exactly why the request has been refused,
 * or when no other response is applicable.
 */
export class NotFoundError extends HttpError {
    constructor(message?: string) {
        super('NotFoundError', HTTPStatusCodes.NOT_FOUND, message || 'Not Found');
    }
}

/**
 * Represents a METHOD NOT ALLOWED error. The method specified in the Request-Line is not allowed for
 * the resource identified by the Request-URI. The response MUST include an Allow header
 * containing a list of valid methods for the requested resource.
 */
export class MethodNotAllowedError extends HttpError {
    constructor(message?: string) {
        super('MethodNotAllowedError', HTTPStatusCodes.METHOD_NOT_ALLOWED, message || 'Method Not Allowed');
    }
}

/**
 * Represents a NOT ACCEPTABLE error. The resource identified by the request is only capable of
 * generating response entities which have content characteristics not acceptable according
 * to the accept headers sent in the request.
 */
export class NotAcceptableError extends HttpError {
    constructor(message?: string) {
        super('NotAcceptableError', HTTPStatusCodes.NOT_ACCEPTABLE, message || 'Not Acceptable');
    }
}

/**
 * Represents a CONFLICT error. The request could not be completed due to a
 * conflict with the current state of the resource.
 */
export class ConflictError extends HttpError {
    constructor(message?: string) {
        super('ConflictError', HTTPStatusCodes.CONFLICT, message || 'Conflict');
    }
}

/**
 * Represents a GONE error. The requested resource is no longer available at the server
 * and no forwarding address is known. This condition is expected to be considered
 * permanent. Clients with link editing capabilities SHOULD delete references to
 * the Request-URI after user approval. If the server does not know, or has
 * no facility to determine, whether or not the condition is permanent, the
 * error 404 (NotFoundError) SHOULD be used instead. This response is
 * cacheable unless indicated otherwise.
 */
export class GoneError extends HttpError {
    constructor(message?: string) {
        super('GoneError', HTTPStatusCodes.GONE, message || 'Gone');
    }
}

/**
 * Represents an UNSUPPORTED MEDIA TYPE error. The server is refusing to service the request
 * because the entity of the request is in a format not supported by the requested resource
 * for the requested method.
 */
export class UnsupportedMediaTypeError extends HttpError {
    constructor(message?: string) {
        super('UnsupportedMediaTypeError', HTTPStatusCodes.UNSUPPORTED_MEDIA_TYPE, message || 'Unsupported Media Type');
    }
}

/**
 * The server timed out waiting for the request. According to HTTP specifications: "The client did not produce
 * a request within the time that the server was prepared to wait. The client MAY repeat the request without
 * modifications at any later time.
 */
export class RequestTimeoutTypeError extends HttpError {
    constructor(message?: string) {
        super('RequestTimeoutTypeError', HTTPStatusCodes.REQUEST_TIMEOUT, message || 'Request timeout');
    }
}

/**
 * Reserved for future use. The original intention was that this code might be used as part of some form of digital
 * cash or micropayment scheme, as proposed for example by GNU Taler[36], but that has not yet happened, and this code
 * is not usually used. Google Developers API uses this status
 * if a particular developer has exceeded the daily limit on requests.
 */
export class PaymentRequiredTypeError extends HttpError {
    constructor(message?: string) {
        super('PaymentRequiredTypeError', HTTPStatusCodes.PAYMENT_REQUIRED, message || 'Payment required');
    }
}

/**
 * The client must first authenticate itself with the proxy.
 */
export class ProxyAuthenticationRequiredTypeError extends HttpError {
    constructor(message?: string) {
        super('ProxyAuthenticationRequiredTypeError',
              HTTPStatusCodes.PROXY_AUTHENTICATION_REQUIRED, message || 'Proxy authentication required');
    }
}

/**
 * The request did not specify the length of its content, which is required by the requested resource.
 */
export class LenthRequiredTypeError extends HttpError {
    constructor(message?: string) {
        super('LenthRequiredTypeError', HTTPStatusCodes.LENGTH_REQUIRED, message || 'Length required');
    }
}

/**
 * The server does not meet one of the preconditions that the requester put on the request.
 */
export class PreconditionFailedTypeError extends HttpError {
    constructor(message?: string) {
        super('PreconditionFailedTypeError', HTTPStatusCodes.PRECONDITION_FAILED, message || 'Precondition failed');
    }
}

/**
 * The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".
 */
export class RequestEntityTooLargeTypeError extends HttpError {
    constructor(message?: string) {
        super('RequestEntityTooLargeTypeError',
              HTTPStatusCodes.REQUEST_ENTITY_TOO_LARGE, message || 'Request entity too large');
    }
}

/**
 * The URI provided was too long for the server to process. Often the result of too much data being encoded as a
 * query-string of a GET request, in which case it should be converted to a POST request.
 * Called "Request-URI Too Long" previously..
 */
export class RequestUriTooLongTypeError extends HttpError {
    constructor(message?: string) {
        super('RequestUriTooLongTypeError',
              HTTPStatusCodes.REQUEST_URI_TOO_LONG, message || 'Request uri too long');
    }
}

/**
 * The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.
 * For example, if the client asked for a part of the file that lies beyond the end of the file.
 * Called "Requested Range Not Satisfiable" previously.
 */
export class RequestedRangeNotSatisfiableTypeError extends HttpError {
    constructor(message?: string) {
        super('RequestedRangeNotSatisfiableTypeError',
              HTTPStatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE, message || 'Requested range not satisfiable');
    }
}

/**
 * The server cannot meet the requirements of the Expect request-header field.
 */
export class ExpectationFailedTypeError extends HttpError {
    constructor(message?: string) {
        super('ExpectationFailedTypeError', HTTPStatusCodes.EXPECTATION_FAILED, message || 'Expectation failed');
    }
}

/**
 * The request was well-formed but was unable to be followed due to semantic errors.
 */
export class UnprocessableEntityTypeError extends HttpError {
    constructor(message?: string) {
        super('UnprocessableEntityTypeError', HTTPStatusCodes.UNPROCESSABLE_ENTITY, message || 'Unprocessable entity');
    }
}

/**
 * The request failed because it depended on another request and that request failed
 */
export class FailedDependencyError extends HttpError {
    constructor(message?: string) {
        super('FailedDependencyError', HTTPStatusCodes.FAILED_DEPENDENCY, message || 'Failed dependency');
    }
}

/**
 * The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.
 */
export class TooManyRequestsTypeError extends HttpError {
    constructor(message?: string) {
        super('TooManyRequestsTypeError', HTTPStatusCodes.TOO_MANY_REQUESTS, message || 'Too many requests');
    }
}

/**
 * Represents an INTERNAL SERVER error. The server encountered an unexpected condition
 * which prevented it from fulfilling the request.
 */
export class InternalServerError extends HttpError {
    constructor(message?: string) {
        super('InternalServerError', HTTPStatusCodes.INTERNAL_SERVER_ERROR, message || 'Internal Server Error');
    }
}

/**
 * Represents a NOT IMPLEMENTED error. The server does not support the functionality required
 *  to fulfill the request. This is the appropriate response when the server does not recognize
 * the request method and is not capable of supporting it for any resource.
 */
export class NotImplementedError extends HttpError {
    constructor(message?: string) {
        super('NotImplementedError', HTTPStatusCodes.NOT_IMPLEMENTED, message || 'Not Implemented');
    }
}

/**
 * The server was acting as a gateway or proxy and received an invalid response from the upstream server.
 */
export class BadGatewayError extends HttpError {
    constructor(message?: string) {
        super('BadGatewayError', HTTPStatusCodes.BAD_GATEWAY, message || 'Bad gateway');
    }
}

/**
 * The server is currently unavailable (because it is overloaded or down for maintenance).
 * Generally, this is a temporary state.
 */
export class ServiceUnavailableError extends HttpError {
    constructor(message?: string) {
        super('ServiceUnavailableError', HTTPStatusCodes.SERVICE_UNAVAILABLE, message || 'Service unavailable');
    }
}

/**
 * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
 */
export class GatewayTimeoutError extends HttpError {
    constructor(message?: string) {
        super('GatewayTimeoutError', HTTPStatusCodes.GATEWAY_TIMEOUT, message || 'Gateway timeout');
    }
}

/**
 * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
 */
export class HttpVersionNotSupportedError extends HttpError {
    constructor(message?: string) {
        super('HttpVersionNotSupportedError',
              HTTPStatusCodes.HTTP_VERSION_NOT_SUPPORTED, message || 'Http version not supported');
    }
}
