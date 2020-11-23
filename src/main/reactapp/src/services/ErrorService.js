import {INTERNAL_ERROR, USER_UNAUTHORIZED} from "../utils/ErrorMessages";

class ErrorService{
    constructor() {
        this.unknownError = "Error occurred!"
    };
    showAppropriateError = (serverErrorResponse, setErrorFunc) => {
        if (serverErrorResponse.response.status === 401) {
            setErrorFunc(USER_UNAUTHORIZED);
        } else  if (serverErrorResponse.response.status === 400) {
            if (serverErrorResponse.response.data.details) {
                setErrorFunc(serverErrorResponse.response.data.details.join(","));
            } else {
                setErrorFunc(this.unknownError);
            }
        } else  if (serverErrorResponse.response.status === 500) {
            setErrorFunc(INTERNAL_ERROR);
        } else {
            if (serverErrorResponse.response.data.error) {
                setErrorFunc(serverErrorResponse.response.data.error);
            } else {
                setErrorFunc(this.unknownError);
            }

        }
    }
}

export default new ErrorService();