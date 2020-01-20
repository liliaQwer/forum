import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle} from "@material-ui/icons";

export default function AccountMenu(props){
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
        //props.history.push('/signin');
    };

    const menuId = 'account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    return (
        <React.Fragment>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
            {renderMenu}
        </React.Fragment>
    );
}
