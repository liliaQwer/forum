const REQUIRED_FIELD = "This field is required!";
const EMAIL_NOT_VALID = "Email is not valid";
const PASSWORD_MISMATCH = "Password mismatch";
const USER_UNAUTHORIZED = "User with such login and password doesn't exist";

function MAX_LENGTH(maxLength) {
    return `Maximum ${maxLength} characters`;
}

const INTERNAL_ERROR = "Something went wrong...";

export { MAX_LENGTH, REQUIRED_FIELD, EMAIL_NOT_VALID, PASSWORD_MISMATCH, USER_UNAUTHORIZED, INTERNAL_ERROR};

