class ErrorResponse {
    constructor({message, errorClass, errorText} = {}) {
        this.message = message;
        this.errorClass = errorClass;
        this.errorText = errorText;
    }
}

export default ErrorResponse;
