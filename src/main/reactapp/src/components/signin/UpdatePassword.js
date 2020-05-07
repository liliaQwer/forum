import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import UserService from "../../services/UserService";
import { MAX_LENGTH, REQUIRED_FIELD, PASSWORD_MISMATCH} from "../../utils/ValidationError";
import {MAX_PASSWORD_LENGTH} from "../../utils/ValidationRules";
import {POSTS} from "../../utils/Url";

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'white',
        borderRadius: '5px'
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
    }
}));

export default function () {
    const classes = useStyles();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [serverError, setServerError] = useState("");
    const [serverErrorOn, setServerErrorOn] = useState(false);

    const location  = useLocation();
    const history = useHistory();

    const token = location.search.split("=")[1];
    console.log(token);
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("onsubmit");
        UserService.updatePassword(token, password, confirmPassword)
            .then(
                response => {
                    const token = response.data;
                    UserService.setAuthenticatedToken(token);
                    history.push(`/${POSTS}`);
                }
            )
            .catch(
                error => {
                    setServerErrorOn(true);
                    setServerError(error.response.data.error);
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

    return (
        <Container maxWidth="xs" className={classes.container}>

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Password Update
                </Typography>
                <ValidatorForm
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
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
                        Sign In
                    </Button>
                </ValidatorForm>
            </div>
        </Container>
    );
}
