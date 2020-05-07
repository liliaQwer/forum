import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import UserService from "../../services/UserService";
import {Alert} from "@material-ui/lab";
import {MAX_LENGTH, REQUIRED_FIELD, USER_UNAUTHORIZED} from "../../utils/ValidationError";
import {MAX_PASSWORD_LENGTH, MAX_LOGIN_LENGTH} from "../../utils/ValidationRules";
import {POSTS, RESTORE, SIGNUP} from "../../utils/Url";
import {ANONYMOUS_USER, FORGOT_PASSWORD, SIGN_UP} from "../../utils/AppConstants";

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'white',
        borderRadius: '5px',
    },
    paper: {
        marginTop: theme.spacing(8),
        paddingBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textCenter: {
        textAlign: 'center'
    },
    greenColor: {
        color: '#008b8b'
    },
    link: {

    }
}));

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
                    console.log(response);
                    UserService.setAuthenticatedToken(token);
                    history.push(`/${POSTS}`);
                }
            )
            .catch(
                error => {
                    if (error.response.status === 401) {
                        setServerError(USER_UNAUTHORIZED);
                    } else {
                        setServerError(error.response.data.details);
                    }
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

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Sign in
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
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
                        Sign In
                    </Button>
                    <Grid container justify="space-between" spacing={2}>
                        <Grid item xs>
                            <Link to={`/${RESTORE}`}  variant="body2" component={RouterLink}>
                                {FORGOT_PASSWORD}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={`/${SIGNUP}`}  variant="body2" component={RouterLink}>
                                {SIGN_UP}
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
