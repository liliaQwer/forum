import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Link as RouterLink,  useHistory } from "react-router-dom";
import React, {useState} from "react";
import UserService from "../../services/UserService";
import {Alert} from "@material-ui/lab";
import {MAX_LENGTH, REQUIRED_FIELD} from "../../utils/ErrorMessages";
import {MAX_PASSWORD_LENGTH, MAX_LOGIN_LENGTH} from "../../utils/ValidationRules";
import {POSTS, RESTORE_PASSWORD_URL, SIGNUP_API_URL} from "../../utils/Url";
import {ANONYMOUS_USER, FORGOT_PASSWORD, SIGN_IN, SIGN_UP_LINK} from "../../utils/AppConstants";
import {useStyles} from "../../utils/AppStyle";
import ErrorService from "../../services/ErrorService";

export default function () {
    const classes = useStyles();

    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const [serverError, setServerError] = useState("");
    const [serverErrorOn, setServerErrorOn] = useState(false);

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("onsubmit");
        UserService.signIn(login, password)
            .then(
                response => {
                    const token = response.data;
                    UserService.setAuthenticatedToken(token);
                    history.push(`/${POSTS}`);
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
        history.push(`${POSTS}`);
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
                    <Grid container justify="space-between" spacing={2}>
                        <Grid item xs>
                            <Link to={`${RESTORE_PASSWORD_URL}`}  variant="body2" component={RouterLink}>
                                {FORGOT_PASSWORD}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={`${SIGNUP_API_URL}`}  variant="body2" component={RouterLink}>
                                {SIGN_UP_LINK}
                            </Link>
                        </Grid>
                        <Grid item xs={12} className={classes.textCenter}>
                            <Link href="#" className={classes.greenColor}  onClick={handleAnonymousUser}>
                                {ANONYMOUS_USER}
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
        </Container>
    );
}
