import {INTERNAL_ERROR, USER_UNAUTHORIZED} from "../utils/ErrorMessages";

class ErrorService{
    constructor() {
        this.unknownError = "Error occurred!"
    };
    showAppropriateError = (serverErrorResponse, setErrorFunc) => {
        setErrorFunc(this.defineError(serverErrorResponse));
    }
    defineError = (serverErrorResponse) => {
        let error = this.unknownError;
        if (serverErrorResponse.response.status === 401) {
            error = USER_UNAUTHORIZED;
        } else  if (serverErrorResponse.response.status === 400) {
            if (serverErrorResponse.response.data.details) {
                error = serverErrorResponse.response.data.details.join(",");
            }
        } else  if (serverErrorResponse.response.status === 500) {
            error = INTERNAL_ERROR;
        } else {
            if (serverErrorResponse.response.data.error) {
                error = serverErrorResponse.response.data.error;
            }
        }
        return error;
    }

    defineErrorFromStatusCode = (code) => {
        let error = this.unknownError;
        if (code === 401) {
            error = USER_UNAUTHORIZED;
        } else  if (code === 500) {
            error = INTERNAL_ERROR;
        }
        return error;
    }
}

export default new ErrorService();