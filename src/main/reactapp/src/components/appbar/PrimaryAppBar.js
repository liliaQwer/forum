import React from "react";
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchField from "./SearchField";
import NotificationBadge from "./NotificationBadge";
import AccountMenu from "./AccountMenu";
import BadgeAccountMenuMobile from "./BadgeAccountMenuMobile";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function PrimaryAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <SearchField />
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <NotificationBadge />
                        <AccountMenu />
                    </div>
                    <div className={classes.sectionMobile}>
                        <BadgeAccountMenuMobile />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
