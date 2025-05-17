class ApiError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.stack = Error.captureStackTrace(this, this.constructor) || [];
    }
}

export default ApiError;