import React, {useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {blueGrey} from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {makeStyles} from '@material-ui/core/styles';
import TablePagination from "@material-ui/core/TablePagination";
import PostService from "../../services/PostService";
import {Container} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import {POSTS} from "../../utils/Url";

const useStyles = makeStyles(theme => ({
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
    addInfo: {
        flexGrow: 0.1,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    avatar: {
        backgroundColor: blueGrey[500],
        width: theme.spacing(4),
        height: theme.spacing(4),
        textAlign: 'center'
    },
    italic: {
        fontStyle: 'italic'
    },
    blueColor: {
        color: 'cornflowerblue'
    }
}));

export default function PostListContent(props) {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [posts, setPosts] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const history = useHistory();

    useEffect(() => {
        PostService.getPostList(page, rowsPerPage)
            .then(response => {
                setPosts(response.data.content);
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

    const handlePostClick = (e, postId) => {
        console.log(postId);
        history.push(`/${POSTS}/${postId}`)
    };

    return (
        <Container className={classes.paper}>
            <Typography className={`${classes.caption} ${classes.italic}`} variant="h5" gutterBottom>
                Here you can find many interesting posts
            </Typography>
            <List className={classes.list}>
                {posts.map(({id, title, description,createdDate, category}) => (
                    <React.Fragment key={id}>
                        <ListItem button onClick={(e) => handlePostClick(e, id)}>
                            <ListItemAvatar>
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={title} secondary={description}
                                          className={classes.grow}/>
                            <ListItemText secondary={category}
                                          className={`${classes.addInfo} ${classes.italic}`}/>
                            <ListItemText secondary={new Date(createdDate).toDateString()}
                                          className={`${classes.addInfo} ${classes.blueColor}`}/>
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalElements}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage={'Posts per page:'}
            />
        </Container>
    );
}