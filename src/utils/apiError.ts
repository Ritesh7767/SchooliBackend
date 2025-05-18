interface ApiErrorInterface {
    success: boolean,
    statusCode: number,
    message: string,
    data?: object,
    stack?: string 
}

class ApiError extends Error implements ApiErrorInterface {
    success: boolean;
    statusCode: number;
    message: string;
    data?: object | undefined;
    stack?: string | any;

    constructor(statusCode: number, message: string, data: object = {}, stack: string = ""){
        super(message)
        this.success = false
        this.message = message
        this.statusCode = statusCode
        this.data = data

        if (stack) this.stack = stack
        else this.stack = Error.captureStackTrace(this, this.constructor)
    }
}

export default ApiError