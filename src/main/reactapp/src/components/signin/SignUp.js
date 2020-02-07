import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator"
import React, { useState } from "react";


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
    }
}));

export default function () {
    const classes = useStyles();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("onsubmit")
    };

    return (
        <Container maxWidth="xs" className={classes.container}>

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Sign up
                </Typography>
                <ValidatorForm
                    className={classes.form}
                    onSubmit={handleSubmit}
                    debounceTime={3000}
                >
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        autoFocus
                        autoComplete="new-password"
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        value={login}
                        onChange={(e)=>setLogin(e.target.value)}
                        autoComplete="new-password"
                    />
                    <TextField
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
                    />
                    <TextField
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
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </ValidatorForm>
            </div>
        </Container>
    );
}
