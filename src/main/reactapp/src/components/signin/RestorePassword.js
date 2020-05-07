import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import UserService from "../../services/UserService";
import {Alert} from "@material-ui/lab";
import {MAX_LENGTH, REQUIRED_FIELD, USER_UNAUTHORIZED} from "../../utils/ValidationError";
import { MAX_EMAIL_LENGTH} from "../../utils/ValidationRules";
import {POSTS} from "../../utils/Url";
import {FILL_EMAIL} from "../../utils/AppConstants";
import Box from "@material-ui/core/Box";

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

    },
    label: {
        width: '100%',
        paddingTop: '10px'
    }

}));

export default function () {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [serverError, setServerError] = useState("");
    const [serverErrorOn, setServerErrorOn] = useState(false);

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("onsubmit");
        UserService.sendMailForRecover(email)
            .then(
                response => {
                    console.log(response);
                    history.push(`/${POSTS}`);
                }
            )
            .catch(
                error => {
                    if (error.status === 401) {
                        setServerError(USER_UNAUTHORIZED);
                    } else {
                        setServerError(error.message);
                    }
                    setServerErrorOn(true);
                });
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setServerErrorOn(false);
    };

    return (
        <Container maxWidth="xs" className={classes.container}>

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Password recover
                </Typography>
                <Box className={classes.label}>
                    {FILL_EMAIL}
                </Box>
                <ValidatorForm
                    className={classes.form}
                    onSubmit={handleSubmit}
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
                        validators={['required', `maxStringLength:${MAX_EMAIL_LENGTH}`]}
                        errorMessages={[REQUIRED_FIELD, MAX_LENGTH(MAX_EMAIL_LENGTH)]}
                        maxLength={MAX_EMAIL_LENGTH}
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
                        Recover
                    </Button>
                </ValidatorForm>
            </div>
        </Container>
    );
}
