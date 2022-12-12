import React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NotificationBadge from "./NotificationBadge";
import AccountMenu from "./AccountMenu";
import BadgeAccountMenuMobile from "./BadgeAccountMenuMobile";
import {useStyles} from "../../utils/AppStyle";
import AddPostButton from "./AddPostButton";
import UserService from "../../services/UserService";

export default function TopAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <div id={'topBarDiv'}></div>
                    <div className={`${classes.grow} ${classes.flex} ${classes.alignCenter} ${classes.fontSize26}`}> Forum </div>
                    <div className={classes.sectionDesktop}>
                        {UserService.isValidAuthentification() && <AddPostButton/>}
                        {UserService.isValidAuthentification() && <NotificationBadge/>}
                        <AccountMenu/>
                    </div>
                    <div className={classes.sectionMobile}>
                        <BadgeAccountMenuMobile/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
