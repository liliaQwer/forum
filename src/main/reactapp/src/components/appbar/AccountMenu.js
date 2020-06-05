import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import React from "react";
import { useHistory } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle} from "@material-ui/icons";
import UserService from "../../services/UserService";
import {SIGNIN} from "../../utils/Url";
import {PROFILE, SIGN_IN, SIGN_OUT} from "../../utils/AppConstants";

export default function AccountMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    let isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleSignOutMenuOpen = event => {
        UserService.signOut();
        history.push(`/${SIGNIN}`);
    };

    const handleSignInMenuOpen = event => {
        history.push(`/${SIGNIN}`);
    };
    const handleMenuClose = event => {
        setAnchorEl(null);
    };

    const menuId = 'account-menu';

    return (
        <React.Fragment>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={menuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMenuOpen}
                onClose={handleMenuClose}
                autoFocus={false}
            >
                {UserService.isAuthenticated() ? (
                    <MenuList variant='menu'>
                        <MenuItem onClick={handleSignInMenuOpen}>{PROFILE}</MenuItem>
                        <MenuItem onClick={handleSignOutMenuOpen}>{SIGN_OUT}</MenuItem>
                    </MenuList>
                ) : (
                    <MenuItem onClick={handleSignInMenuOpen}>{SIGN_IN}</MenuItem>
                )}
            </Menu>
        </React.Fragment>
    );
}
