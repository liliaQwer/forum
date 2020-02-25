import React from "react";
import {makeStyles, Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from "@material-ui/core/Typography";
import {APP_BOTTOM_TEXT} from "../../utils/AppConstants";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        top: 'auto',
        bottom: '0px',
        position: 'absolute',
        backgroundColor: '#201a79'
    },
    toolbar: {
        minHeight: '34px'
    },
    title: {
        textAlign: 'center',
        color: '#c1baba'
    }
}));

export default function BottomAppBar() {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar}>
            <Toolbar  className={classes.toolbar}>
                <Typography color="textSecondary" className={`${classes.title} ${classes.grow}`}>
                    {APP_BOTTOM_TEXT}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
