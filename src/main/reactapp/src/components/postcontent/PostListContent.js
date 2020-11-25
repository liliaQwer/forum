import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import TablePagination from "@material-ui/core/TablePagination";
import PostService from "../../services/PostService";
import {Container} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import {POSTS_API_URL} from "../../utils/Url";
import {
    CANCEL,
    DELETE,
    DELETE_POST_CONFIRM,
    POST_DELETE_SUCCESS,
    POST_LIST_CAPTION
} from "../../utils/AppConstants";
import {useStyles} from "../../utils/AppStyle";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {Alert} from "@material-ui/lab";
import ErrorService from "../../services/ErrorService";
import InfoDialog from "../utility/InfoDialog";

export default function PostListContent(props) {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [posts, setPosts] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [postIdsForDelete, setPostIdsForDelete] = useState([]);
    const [serverErrorOn, setServerErrorOn] = useState(false);
    const [serverError, setServerError] = useState();
    const [infoMessageOn, setInfoMessageOn] = useState(false);
    const [infoMessage, setInfoMessage] = useState();

    const history = useHistory();

    useEffect(() => {
        getPostList(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const getPostList = (page, rowsPerPage) => {
        PostService.getPostList(page, rowsPerPage)
            .then(response => {
                setPosts(response.data.content);
                setTotalElements(response.data.totalElements);
            })
            .catch(error => {
                ErrorService.showAppropriateError(error, setServerError);
                setServerErrorOn(true);
            });
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handlePostClick = (e, postId) => {
        console.log(postId);
        history.push(`${POSTS_API_URL}/${postId}`)
    };

    const handleDeletePost = (e, postId) => {
        setOpenDeleteDialog(true);
        setPostIdsForDelete([postId]);
    }

    const handleDeleteConfirm = () => {
        PostService.deletePost(postIdsForDelete)
            .then(response => {
                if (page !== 0){
                    setPage(0);
                } else {
                    getPostList(0, rowsPerPage);
                }
                setPostIdsForDelete([]);
                setInfoMessage(POST_DELETE_SUCCESS);
                setInfoMessageOn(true);
                setTimeout(() => setInfoMessageOn(false), 3000);
            })
            .catch(error => {
                ErrorService.showAppropriateError(error, setServerError);
                setServerErrorOn(true);
                setTimeout(() => setServerErrorOn(false), 3000);
            })
            .finally(() => {
                setOpenDeleteDialog(false);
            });
    }

    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false);
        setPostIdsForDelete([]);
    }

    return (
        <Container className={classes.paper}>
            <Typography className={`${classes.caption} ${classes.italic}`} variant="h5" gutterBottom>
                {POST_LIST_CAPTION}
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
                                          className={`${classes.lessGrow} ${classes.alignRight} ${classes.flex} ${classes.italic}`}/>
                            <ListItemText secondary={new Date(createdDate).toDateString()}
                                          className={`${classes.lessGrow} ${classes.alignRight} ${classes.flex} ${classes.blueColor}`}/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={(e) => handleDeletePost(e, id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
            {serverErrorOn &&
            <Alert severity="error">
                {serverError}
            </Alert>
            }
            {infoMessageOn &&
            <Alert severity="success">
                {infoMessage}
            </Alert>
            }
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
            <InfoDialog
                title={DELETE_POST_CONFIRM}
                confirmText={DELETE}
                cancelText={CANCEL}
                openDialog={openDeleteDialog}
                handleCancel={handleDeleteCancel}
                handleConfirm={handleDeleteConfirm}
            />
        </Container>
    );
}