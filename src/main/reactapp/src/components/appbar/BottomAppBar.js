import React from "react";
import {Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from "@material-ui/core/Typography";
import {APP_BOTTOM_TEXT} from "../../utils/AppConstants";
import {useStyles} from "../../utils/AppStyle";

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
