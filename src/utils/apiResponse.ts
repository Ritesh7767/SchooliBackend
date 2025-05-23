interface ApiResponseInterface {
    success: boolean,
    statusCode: number,
    data: object,
    message?: string
}

class ApiResponse implements ApiResponseInterface {
    success: boolean;
    statusCode: number;
    data: object;
    message?: string | undefined;

    constructor(statusCode: number, data: object, message: string){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}


export default ApiResponse