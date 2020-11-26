import React, {useEffect, useState} from "react";
import {Container} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {useParams} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ThumbDownSharpIcon from '@material-ui/icons/ThumbDownSharp';
import ThumbUpSharpIcon from '@material-ui/icons/ThumbUpSharp';
import IconButton from '@material-ui/core/IconButton';
import PostService from "../../services/PostService";
import {useStyles} from "../../utils/AppStyle";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {
    ADD,
    CANCEL,
    COMMENT_ADD_CAPTION, COMMENT_ADD_SUCCESS, COMMENT_DELETE_SUCCESS,
    DELETE, DELETE_COMMENT_CONFIRM
} from "../../utils/AppConstants";
import ChatIcon from '@material-ui/icons/Chat';
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ErrorService from "../../services/ErrorService";
import {Alert} from "@material-ui/lab";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoDialog from "../utility/InfoDialog";
import DialogContent from "@material-ui/core/DialogContent";
import UserService from "../../services/UserService";

export default function PostWithComments(props) {
    const classes = useStyles();
    const {postId} = useParams();
    const [post, setPost] = useState({
        title: '',
        createdDate: "",
        content: ""
    });
    const [comments, setComments] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalElements, setTotalElements] = useState(0);
    const [openAddCommentDialog, setOpenAddCommentDialog] = useState(false);
    const [openDeleteCommentDialog, setOpenDeleteCommentDialog] = useState(false);
    const [commentToAdd, setCommentToAdd] = useState("");
    const [commentIdForDelete, setCommentIdForDelete] = useState("");
    const [serverErrorOn, setServerErrorOn] = useState(false);
    const [serverError, setServerError] = useState();
    const [infoMessageOn, setInfoMessageOn] = useState(false);
    const [infoMessage, setInfoMessage] = useState();
    const italicFontStyle = {
        fontStyle: 'italic'
    }
    const likeStyle = {
        fontSize: '12px',
        color: 'blue'
    }
    const dislikeStyle = {
        fontSize: '12px',
        color: 'red'
    }

    useEffect(() => {
        PostService.getPostById(postId)
            .then(response => {
                console.log(response.data);
                setPost(response.data);
                return PostService.getPostComments(postId, page, rowsPerPage);
            })
            .then((response) => {
                console.log(response.data);
                setComments(response.data.content);
            })
            .catch()
    }, []);

    const handleAddCommentClick = () => {
        setOpenAddCommentDialog(true);
    }

    const handleAddCommentConfirm = () => {
        PostService.addComment(postId, commentToAdd)
            .then(response => {
                // if (page !== 0){
                //     setPage(0);
                // } else {
                setCommentToAdd("");
                setOpenAddCommentDialog(false);
                return PostService.getPostComments(postId, page, rowsPerPage);
                // }
                // setPostIdsForDelete([]);
                setInfoMessage(COMMENT_ADD_SUCCESS);
                setInfoMessageOn(true);
                setTimeout(() => setInfoMessageOn(false), 3000);
            })
            .then((response) => {
                console.log(response.data);
                setComments(response.data.content);
            })
            .catch(error => {
                ErrorService.showAppropriateError(error, setServerError);
                setServerErrorOn(true);
                setTimeout(() => setServerErrorOn(false), 3000);
            })
    }

    const handleAddCommentCancel = () => {
        setOpenAddCommentDialog(false);
        setCommentToAdd("");
    }

    const handleCommentToAddChange = (event) => {
        setCommentToAdd(event.target.value);
    }

    const handleDeleteCommentClick = (event, commentId) => {
        setOpenDeleteCommentDialog(true);
        setCommentIdForDelete(commentId);
    }

    const handleDeleteCommentConfirm = () => {
        PostService.deleteComment(postId, commentIdForDelete)
            .then(response => {
                // if (page !== 0){
                //     setPage(0);
                // } else {
                //     getPostList(0, rowsPerPage);
                // }
                setCommentIdForDelete("");
                setInfoMessage(COMMENT_DELETE_SUCCESS);
                setInfoMessageOn(true);
                setTimeout(() => setInfoMessageOn(false), 3000);
            })
            .catch(error => {
                ErrorService.showAppropriateError(error, setServerError);
                setServerErrorOn(true);
                setTimeout(() => setServerErrorOn(false), 3000);
            })
            .finally(() => {
                setOpenDeleteCommentDialog(false);
            });
    }

    const handleDeleteCommentCancel = () => {
        setOpenDeleteCommentDialog(false);
        setCommentIdForDelete("");
    }

    const handleLikeClick = (event, commentId) => {
        PostService.addCommentLike(postId, commentId)
            .then(response => {
                return PostService.getPostComments(postId, page, rowsPerPage);
            })
            .then((response) => {
                setComments(response.data.content);
            });
    }

    const handleDislikeClick = (event, commentId) => {
        PostService.addCommentDislike(postId, commentId)
            .then(response => {
                return PostService.getPostComments(postId, page, rowsPerPage);
            })
            .then((response) => {
                setComments(response.data.content);
            });
    }

    return (
        <Container>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    title={post.title}
                    subheader={post.createdDate}
                />
                <CardContent>
                    <Typography>
                        {post.content}
                    </Typography>
                </CardContent>
                <Divider/>
                <List className={classes.root}>
                    {comments.map(({id, content, likesCount, dislikesCount, createdDate, createdBy}) => (
                        <React.Fragment key={id}>
                            <ListItem alignItems="center">
                                <ListItemText
                                    primary={createdBy}
                                    secondary={content}
                                    className={classes.flexGrow1}
                                />
                                <ListItemText
                                    secondary={createdDate}
                                    className={`${classes.noFlexShrink} ${classes.noFlexGrow}`}
                                    secondaryTypographyProps={{ style: italicFontStyle }}
                                />
                                <ListItemIcon className={classes.minWidth45} onClick={e => handleLikeClick(e, id)}>
                                    <IconButton aria-label="add to favorites">
                                        <ThumbUpSharpIcon fontSize="small" color="primary"/>
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText
                                    secondary={likesCount}
                                    className={`${classes.noFlexShrink} ${classes.noFlexGrow}`}
                                    secondaryTypographyProps={{ style: likeStyle }}
                                />
                                <ListItemIcon className={classes.minWidth45} onClick={e => handleDislikeClick(e, id)}>
                                    <IconButton aria-label="share">
                                        <ThumbDownSharpIcon fontSize="small" color="secondary"/>
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText
                                    secondary={dislikesCount}
                                    className={`${classes.noFlexShrink} ${classes.noFlexGrow}`}
                                    secondaryTypographyProps={{ style: dislikeStyle }}
                                />
                                {createdBy === UserService.getUserLogin() && UserService.isValidAuthentification() &&
                                <ListItemIcon>
                                    <IconButton edge="end" aria-label="delete"
                                                onClick={(e) => handleDeleteCommentClick(e, id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemIcon>
                                }
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                        </React.Fragment>
                    ))}
                </List>
                {UserService.isValidAuthentification() &&
                <CardActions disableSpacing className={classes.alignRight} onClick={handleAddCommentClick}>
                    <Tooltip title="Add a comment">
                        <IconButton>
                            <ChatIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
                }
            </Card>
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
            <Dialog
                open={openAddCommentDialog}
                onClose={handleAddCommentCancel}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">{COMMENT_ADD_CAPTION}</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    variant="outlined"
                    multiline
                    rows={4}
                    id="commentToAdd"
                    value={commentToAdd}
                    onChange={handleCommentToAddChange}
                    label="Your comment"
                    className={classes.flex}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddCommentConfirm} color="primary">
                        {ADD}
                    </Button>
                    <Button onClick={handleAddCommentCancel} color="primary">
                        {CANCEL}
                    </Button>
                </DialogActions>

            </Dialog>
            <InfoDialog
                title={DELETE_COMMENT_CONFIRM}
                confirmText={DELETE}
                cancelText={CANCEL}
                openDialog={openDeleteCommentDialog}
                handleCancel={handleDeleteCommentCancel}
                handleConfirm={handleDeleteCommentConfirm}
                />
        </Container>
    );
}