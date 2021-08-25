import makeStyles from "@material-ui/core/styles/makeStyles";
import {blueGrey} from "@material-ui/core/colors";

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
        alignCenter: {
            justifyContent: 'center'
        },
        caption: {
            padding: theme.spacing(2, 2, 0),
            color: 'lightslategrey'
        },
        paper: {
            paddingBottom: 50,
            // backgroundColor: '#f0eff5'
            backgroundColor: 'white',
            borderRadius: '5px'
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
        directionColumn: {
            flexDirection: 'column'
        },
        italic: {
            fontStyle: 'italic'
        },
        blueColor: {
            color: 'cornflowerblue'
        },
        whiteColor: {
            color: 'white'
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
            display: 'flex',
            flexDirection: 'column',
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
            backgroundColor: 'rgb(160 168 179 / 15%)',
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
        fullWidth: {
            width: '100% !important',
        },
        halfWidth: {
            width: '50% !important',
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        marginAuto: {
            margin: 'auto !important'
        },
        noFlexShrink: {
            flexShrink: '0'
        },
        noFlexGrow: {
            flexGrow: '0 !important'
        },
        flexGrow1: {
            flexGrow: '1 !important'
        },
        marginLeft15: {
            marginLeft: '15px !important'
        },
        marginRight15: {
            marginRight: '15px !important'
        },
        marginTop15: {
            marginTop: '15px !important'
        },
        marginRight25: {
            marginRight: '25px !important'
        },
        minWidth45: {
            minWidth: '45px !important'
        },
        minWidth85: {
            minWidth: '85px !important'
        },
    minWidth20: {
        minWidth: '20px !important'
    },
        floatRight: {
            float: 'right !important'
        },
        width2: {
            width: theme.spacing(2)
        },
        fontSize26: {
            fontSize: '26px'
        },
        alignItemsBaseLine: {
            alignItems: 'baseline'
        },
        flexNoWrap: {
            flexWrap: 'nowrap'
        }
    })
);

export {useStyles}