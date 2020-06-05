import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import UserService from "../../services/UserService";
import {Alert} from "@material-ui/lab";
import {
    EMAIL_NOT_VALID,
    INTERNAL_ERROR,
    MAX_LENGTH,
    REQUIRED_FIELD,
    USER_UNAUTHORIZED
} from "../../utils/ErrorMessages";
import { MAX_EMAIL_LENGTH} from "../../utils/ValidationRules";
import {CONTINUE, ENTER_EMAIL_FOR_RECOVER, PASSWORD_RECOVER} from "../../utils/AppConstants";
import Box from "@material-ui/core/Box";
import {useStyles} from "../../utils/AppStyle";
import ErrorService from "../../services/ErrorService";

export default function () {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [continueButtonDisabled, setContinueButtonDisabled] = useState(false);
    const [serverError, setServerError] = useState("");
    const [serverMessage, setServerMessage] = useState("");
    const serverErrorOn = () => {
        if (serverError) return true;
        return false;
    };
    const serverMessageOn = () => {
        if (serverMessage) return true;
        return false;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        clearServerInfo();
        setContinueButtonDisabled(true);
        UserService.sendMailForRecover(email)
            .then(
                response => {
                    setServerMessage(response.data);
                }
            )
            .catch(
                error => {
                    setContinueButtonDisabled(false);
                    ErrorService.showAppropriateError(error, setServerError);
                });
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        clearServerInfo();
        setContinueButtonDisabled(false);
    };

    const clearServerInfo = () => {
        setServerError("");
        setServerMessage("");
    };

    return (
        <Container maxWidth="xs" className={classes.container}>

            <div className={classes.authPaper}>
                <Avatar className={classes.authAvatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {PASSWORD_RECOVER}
                </Typography>
                <Box className={classes.label}>
                    {ENTER_EMAIL_FOR_RECOVER}
                </Box>
                <ValidatorForm
                    className={classes.form}
                    onSubmit={handleSubmit}
                    debounceTime={500}
                >
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="email"
                        name="email"
                        autoComplete="new-password"
                        value={email}
                        onChange={handleEmailChange}
                        autoFocus
                        validators={['required','isEmail', `maxStringLength:${MAX_EMAIL_LENGTH}`]}
                        errorMessages={[REQUIRED_FIELD, EMAIL_NOT_VALID, MAX_LENGTH(MAX_EMAIL_LENGTH)]}
                        maxLength={MAX_EMAIL_LENGTH}
                    />

                    {serverErrorOn() &&
                    <Alert severity="error">
                        {serverError}
                    </Alert>
                    }
                    {serverMessageOn() &&
                    <Alert severity="success">
                        {serverMessage}
                    </Alert>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={continueButtonDisabled}
                    >
                        {CONTINUE}
                    </Button>
                </ValidatorForm>
            </div>
        </Container>
    );
}
