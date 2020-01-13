import React from 'react';
import './App.css';
import ForumLogo from './images/forum8.png'
import { lighten, makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Box} from "@material-ui/core";
import PrimaryAppBar from "./components/appbar/PrimaryAppBar";
import PostsTable from "./components/posttable/PostsTable";

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
        <PrimaryAppBar />
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
