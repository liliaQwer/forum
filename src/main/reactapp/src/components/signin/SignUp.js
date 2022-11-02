import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { MAX_LENGTH, EMAIL_NOT_VALID, REQUIRED_FIELD, PASSWORD_MISMATCH} from "../../utils/ErrorMessages";
import {MAX_EMAIL_LENGTH, MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH} from "../../utils/ValidationRules";
import {POSTS} from "../../utils/Url";
import {SIGN_UP} from "../../utils/AppConstants";
import {useStyles} from "../../utils/AppStyle";
import ErrorService from "../../services/ErrorService";

export default function () {
    const classes = useStyles();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [serverError, setServerError] = useState("");
    const [serverErrorOn, setServerErrorOn] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("onsubmit");
        UserService.signUp(email, login, password)
            .then(
                response => {
                    const token = response.data;
                    UserService.setAuthenticatedToken(token);
                    navigate(`/${POSTS}`);
                }
            )
            .catch(
                error => {
                    ErrorService.showAppropriateError(error, setServerError);
                    setServerErrorOn(true);
            });
    };

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log("checkPAsswords");
            return value === password;
        });
    });

    useEffect(() => {
        return () => {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        }
    }, []);

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
        setServerErrorOn(false);
    };

    const handleLoginChange = (event) =>{
        setLogin(event.target.value);
        setServerErrorOn(false);
    };

    return (
        <Container maxWidth="xs" className={classes.container}>

            <div className={classes.authPaper}>
                <Avatar className={classes.authAvatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {SIGN_UP}
                </Typography>
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
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        autoFocus
                        autoComplete="new-password"
                        validators={['required', 'isEmail', `maxStringLength:${MAX_EMAIL_LENGTH}`]}
                        errorMessages={[REQUIRED_FIELD, EMAIL_NOT_VALID, MAX_LENGTH(MAX_EMAIL_LENGTH)]}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        value={login}
                        onChange={handleLoginChange}
                        autoComplete="new-password"
                        validators={['required', `maxStringLength:${MAX_LOGIN_LENGTH}`]}
                        errorMessages={[REQUIRED_FIELD, MAX_LENGTH(MAX_LOGIN_LENGTH)]}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        autoComplete="new-password"
                        validators={['required', `maxStringLength:${MAX_PASSWORD_LENGTH}`]}
                        errorMessages={[REQUIRED_FIELD, MAX_LENGTH(MAX_PASSWORD_LENGTH)]}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        id="confirm_password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        validators={['isPasswordMatch', 'required', `maxStringLength:${MAX_PASSWORD_LENGTH}`]}
                        errorMessages={[PASSWORD_MISMATCH, REQUIRED_FIELD, MAX_LENGTH(MAX_PASSWORD_LENGTH)]}
                    />
                    {serverErrorOn &&
                        <Alert severity="error">
                            {serverError}
                        </Alert>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {SIGN_UP}
                    </Button>
                </ValidatorForm>
            </div>
        </Container>
    );
}
