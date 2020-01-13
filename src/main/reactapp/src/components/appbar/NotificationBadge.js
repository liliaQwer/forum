import Badge from "@material-ui/core/Badge/Badge";
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from "@material-ui/core/IconButton";
import React from "react";

export default function NotificationBadge(){
    return (
    <IconButton aria-label="show 17 new notifications" color="inherit">
        <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
        </Badge>
    </IconButton>
    );
}
