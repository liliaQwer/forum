import React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchField from "./SearchField";
import NotificationBadge from "./NotificationBadge";
import AccountMenu from "./AccountMenu";
import BadgeAccountMenuMobile from "./BadgeAccountMenuMobile";
import {useStyles} from "../../utils/AppStyle";

export default function TopAppBar() {
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
