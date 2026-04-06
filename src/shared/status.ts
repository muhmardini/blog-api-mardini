export enum HttpStatus {
    // 2XX
    OK = 200,
    CREATED = 201,
    // 4XX
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    // 5XX
    INTERNAL_SERVER_ERROR = 500,
}