import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import React from "react";
import { useHistory } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle} from "@material-ui/icons";
import UserService from "../../services/UserService";
import {SIGNIN} from "../../utils/Url";

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
                        <MenuItem onClick={handleSignInMenuOpen}>My account</MenuItem>
                        <MenuItem onClick={handleSignOutMenuOpen}>Sign out</MenuItem>
                    </MenuList>
                ) : (
                    <MenuItem onClick={handleSignInMenuOpen}>Sign in</MenuItem>
                )}
            </Menu>
        </React.Fragment>
    );
}
