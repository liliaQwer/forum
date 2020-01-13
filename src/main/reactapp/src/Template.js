import React from 'react';
import './App.css';
import ForumLogo from './images/forum8.png'
import { fade, lighten, makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Box} from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import { blueGrey } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import {AccountCircle} from "@material-ui/icons";
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(1),
        backgroundColor: 'white',
        borderRadius: '5px',
    },
    forumLogo: {
        marginRight: 'auto',
width: '30%',
height: '150px'
    },
    paper: {
        marginTop: theme.spacing(1),
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
    }
}));

function Template() {
    const classes = useStyles();
    return (
        <React.Fragment>
        <PrimarySearchAppBar />
        <Container fixed maxWidth="lg" className={classes.container}>

            <div style={({textAlign: 'center'})}>
                        <img className={classes.forumLogo} src={ForumLogo} align="center"></img>
            </div>
            <div className={classes.paper}>
                <EnhancedTable/>
            </div>
        </Container>
        </React.Fragment>
    );
}



const useStylesMenu = makeStyles(theme => ({
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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

function PrimarySearchAppBar() {
    const classes = useStylesMenu();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
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
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}





function createData(name, definition, createDate, author) {
    return { name, definition, createDate, author };
}

const rows = [
    createData('Science', 'ScienceScienceScienceScienceScience', '01.01.2020', 'chin-chin'),
    createData('Fashion', 'FashionFashionFashionFashionFashionFashion', '01.01.2020', 'chin-chin'),
    createData('Politics', 'PoliticsPoliticsPoliticsPoliticsPoliticsPolitics', '01.01.2020', 'chin-chin'),
    createData('Economy', 'EconomyEconomyEconomyEconomyEconomy', '01.01.2020', 'lola'),
    createData('Personal', 'PersonalPersonalPersonalPersonalPersonal', '01.01.2020', 'tomSoyer'),
    createData('Problems', 'ProblemsProblemsProblemsProblemsProblems', '01.01.2020', 'tomSoyer'),
    createData('Holidays', 'HolidaysHolidaysHolidaysHolidaysHolidays', '01.01.2020', 'tomSoyer'),
    createData('Songs', 'SongsSongsSongsSongsSongsSongs', '01.01.2020', 'tomSoyer'),
    createData('Business', 'BusinessBusinessBusinessBusiness', '01.01.2020', 'tomSoyer'),
    createData('Kids', 'KidsKidsKidsKidsKidsKidsKidsKidsKids', '01.01.2020', 'lola'),
    createData('Shops', 'ShopsShopsShopsShopsShopsShopsShops', '01.01.2020', 'tomSoyer'),
    createData('Nougat', 'NougatNougatNougatNougatNougatNougatNougatNougat', '01.01.2020', 'lola'),
    createData('Oreo', 'OreoOreoOreoOreoOreoOreoOreoOreoOreoOreo', '01.01.2020', 'lola'),
];

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    alignRight: {
        textAlign: 'right'
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();

    return (
        <div className={classes.alignRight}>
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>

        </div>
    );
};


const useStyles2 = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    avatar: {
        backgroundColor: blueGrey[500],
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const EnhancedTable = (props) => {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
            <Box className={classes.paper}>
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                <Typography color="textPrimary">
                                                    {row.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left" >
                                                <Typography color="textSecondary">
                                                    {row.definition}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography color="textSecondary">
                                                    {row.createDate}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right" >
                                                <Avatar aria-label="recipe" className={classes.avatar}>
                                                    R
                                                </Avatar>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={5} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>

    );
};




export default Template;
