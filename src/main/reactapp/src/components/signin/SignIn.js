import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {Link as RouterLink, useNavigate, useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import UserService from "../../services/UserService";
import {Alert} from "@material-ui/lab";
import {MAX_LENGTH, REQUIRED_FIELD} from "../../utils/ErrorMessages";
import {MAX_PASSWORD_LENGTH, MAX_LOGIN_LENGTH} from "../../utils/ValidationRules";
import {FACEBOOK_AUTH_URL, POSTS, POSTS_API_URL, RESTORE_PASSWORD_URL, SIGNUP_API_URL} from "../../utils/Url";
import {ANONYMOUS_USER, FORGOT_PASSWORD, SIGN_IN, SIGN_UP_LINK} from "../../utils/AppConstants";
import {useStyles} from "../../utils/AppStyle";
import ErrorService from "../../services/ErrorService";
import fbLogo from '../../images/fb-logo.png';

export default function () {
    const classes = useStyles();
    const [searchParams] = useSearchParams();

    const errorFromUrl = searchParams.get('error');

    const {error} = useParams();
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const [serverError, setServerError] = useState(error);
    const [serverErrorOn, setServerErrorOn] = useState(error ? true : false);

    const navigate = useNavigate();

    useEffect(() => {
        if (errorFromUrl) {
            setServerError(errorFromUrl);
            setServerErrorOn(true);
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("onsubmit");
        UserService.signIn(login, password)
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

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
        setServerErrorOn(false);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setServerErrorOn(false);
    };

    const handleAnonymousUser = (event) => {
        event.preventDefault();
        UserService.signOut();
        navigate(`/${POSTS}`);
    };

    const handleSignIn = () => {
        navigate(`${SIGNUP_API_URL}`);
    };

    const handleRestorePassword = () => {
        navigate(`${RESTORE_PASSWORD_URL}`);
    };

    return (
        <Container maxWidth="xs" className={classes.container}>

            <div className={classes.authPaper}>
                <Avatar className={classes.authAvatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {SIGN_IN}
                </Typography>
                <a className={classes.facebookButton} href={FACEBOOK_AUTH_URL}>
                    <img className={classes.facebookImg} src={fbLogo} alt="Facebook" /> with Facebook</a>
                <Typography align={"center"} variant="h6">
                    Or
                </Typography>
                <ValidatorForm
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="new-password"
                        value={login}
                        onChange={handleLoginChange}
                        autoFocus
                        validators={['required', `maxStringLength:${MAX_LOGIN_LENGTH}`]}
                        errorMessages={[REQUIRED_FIELD, MAX_LENGTH(MAX_LOGIN_LENGTH)]}
                        maxLength={MAX_LOGIN_LENGTH}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={handlePasswordChange}
                        type="password"
                        maxLength={MAX_PASSWORD_LENGTH}
                        validators={['required', `maxStringLength:${MAX_PASSWORD_LENGTH}`]}
                        errorMessages={[REQUIRED_FIELD, MAX_LENGTH(MAX_PASSWORD_LENGTH)]}
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
                        {SIGN_IN}
                    </Button>
                    <Grid container justifyContent="space-between" spacing={2}>
                        <Grid item xs>
                            <Link href="#" to={`${RESTORE_PASSWORD_URL}`}  onClick={handleRestorePassword}  variant="body2" >
                                {FORGOT_PASSWORD}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" onClick={handleSignIn} variant="body2" >
                                {SIGN_UP_LINK}
                            </Link>
                        </Grid>
                        <Grid item xs={12} className={classes.textCenter}>
                            <Link href="#" onClick={handleAnonymousUser}>
                                {ANONYMOUS_USER}
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
        </Container>
    );
}
