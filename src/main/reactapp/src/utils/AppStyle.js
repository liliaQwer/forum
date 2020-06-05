import makeStyles from "@material-ui/core/styles/makeStyles";
import {blueGrey} from "@material-ui/core/colors";
import {fade} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
        avatar: {
            backgroundColor: blueGrey[500],
            width: theme.spacing(4),
            height: theme.spacing(4),
            textAlign: 'center'
        },
        alignRight: {
            justifyContent: 'flex-end'
        },
        caption: {
            padding: theme.spacing(2, 2, 0),
            color: 'lightslategrey'
        },
        paper: {
            paddingBottom: 50,
            backgroundColor: '#f0eff5'
        },
        list: {
            marginBottom: theme.spacing(2),
        },
        grow: {
            flexGrow: 1,
        },
        lessGrow: {
            flexGrow: 0.1,
        },
        flex: {
            display: 'flex'
        },
        italic: {
            fontStyle: 'italic'
        },
        blueColor: {
            color: 'cornflowerblue'
        },
        container: {
            backgroundColor: 'white',
            borderRadius: '5px',
        },
        authPaper: {
            marginTop: theme.spacing(8),
            paddingBottom: theme.spacing(3),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        authAvatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        textCenter: {
            textAlign: 'center'
        },
        greenColor: {
            color: '#008b8b'
        },
        link: {},
        label: {
            width: '100%',
            paddingTop: '10px'
        },

        appBar: {
            top: 'auto',
            bottom: '0px',
            position: 'absolute',
            backgroundColor: '#201a79'
        },
        toolbar: {
            minHeight: '34px'
        },
        title: {
            textAlign: 'center',
            color: '#c1baba'
        },
        menuButton: {
            marginRight: theme.spacing(2),
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
        }
    })
);

export { useStyles }