import {INTERNAL_ERROR, USER_UNAUTHORIZED} from "../utils/ErrorMessages";

class ErrorService{
    showAppropriateError = (serverErrorResponse, setErrorFunc) => {
        if (serverErrorResponse.response.status === 401) {
            setErrorFunc(USER_UNAUTHORIZED);
        } else  if (serverErrorResponse.response.status === 400) {
            setErrorFunc(serverErrorResponse.response.data.details.join(","));
        } else  if (serverErrorResponse.response.status === 500) {
            setErrorFunc(INTERNAL_ERROR);
        } else {
            setErrorFunc(serverErrorResponse.response.data.error);
        }
    }
}

export default new ErrorService();