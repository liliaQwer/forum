import React, {useEffect, useState} from 'react';
import '../App.css';
import ForumLogo from '../images/forum8.png'
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Box} from "@material-ui/core";
import TopAppBar from "./appbar/TopAppBar";
import PostsTable from "./postcontent/PostsTable";
import PostService from "../services/PostService";
import BottomAppBar from "./appbar/BottomAppBar";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(1),
        backgroundColor: 'white',
        borderRadius: '5px',
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(236, 236, 243, 0.9)),url(${ForumLogo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
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

function MainPage() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <TopAppBar/>
            <Container fixed maxWidth="lg" className={classes.container}>
                {/*<div style={({textAlign: 'center'})}>*/}
                {/*    <img className={classes.forumLogo} alt="forum" src={ForumLogo} align="center"></img>*/}
                {/*</div>*/}
                <div className={classes.paper}>
                    <EnhancedTable/>
                </div>
            </Container>
            <BottomAppBar/>
        </React.Fragment>
    );
}

const useToolbarStyles = makeStyles(theme => ({
    alignRight: {
        textAlign: 'right'
    },
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();

    return (
        <div className={classes.alignRight}>
            <Tooltip title="Filter list">
                <IconButton aria-label="filter list">
                    <FilterListIcon/>
                </IconButton>
            </Tooltip>
        </div>
    );
};


const useStyles2 = makeStyles(theme => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    }
}));

const EnhancedTable = (props) => {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        PostService.getPostList(page, rowsPerPage)
            .then(response => {
                setRows(response.data.content);
                setTotalElements(response.data.totalElements);
            })
            .catch()
    }, [page, rowsPerPage]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    if (rows.length === 0) {
        return null;
    }
    return (
        <Box className={classes.paper}>
            <EnhancedTableToolbar/>
            <PostsTable
                rows={rows}
                rowsPerPage={rowsPerPage}
                page={page}
            />
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalElements}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default MainPage;
