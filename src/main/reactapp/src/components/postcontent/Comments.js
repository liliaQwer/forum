import React, {useEffect, useState} from "react";
import UserService from "../../services/UserService";
import {useStyles} from "../../utils/AppStyle";
import ThumbDownSharpIcon from '@material-ui/icons/ThumbDownSharp';
import ThumbUpSharpIcon from '@material-ui/icons/ThumbUpSharp';
import IconButton from '@material-ui/core/IconButton';
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import PostService from "../../services/PostService";
import {
    ADD,
    CANCEL,
    COMMENT_ADD_CAPTION, COMMENT_ADD_SUCCESS,
    COMMENT_DELETE_SUCCESS, DELETE,
    DELETE_COMMENT_CONFIRM,
    SHOW_MORE_COMMENTS
} from "../../utils/AppConstants";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";
import ChatIcon from "@material-ui/icons/Chat";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import InfoDialog from "../utility/InfoDialog";
import ReactDOM from "react-dom";

export default function (props) {
    const classes = useStyles();
    const [comments, setComments] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalCommentPages, setTotalCommentPages] = useState(0);
    const [openAddCommentDialog, setOpenAddCommentDialog] = useState(false);
    const [openDeleteCommentDialog, setOpenDeleteCommentDialog] = useState(false);
    const [commentToAdd, setCommentToAdd] = useState("");
    const [commentIdForDelete, setCommentIdForDelete] = useState("");

    useEffect(() => {
        PostService.getPostComments(props.postId)
            .then(response => {
                console.log(response.data);
                setComments(response.data.content);
                setTotalCommentPages(response.data.totalPages);
            })
    }, []);

    const handleDeleteCommentClick = (event, commentId) => {
        setOpenDeleteCommentDialog(true);
        setCommentIdForDelete(commentId);
    }

    const handleDeleteCommentConfirm = () => {
        PostService.deleteComment(props.postId, commentIdForDelete)
            .then(response => {
                setCommentIdForDelete("");
                props.onMessageInfo(COMMENT_DELETE_SUCCESS);
                setPage(0)
                return PostService.getPostComments(props.postId, 0, rowsPerPage);
            })
            .then((response) => {
                console.log(response.data);
                setComments(response.data.content);
                setTotalCommentPages(response.data.totalPages)
            })
            .catch(error => {
                props.onError(error);
            })
            .finally(() => {
                setOpenDeleteCommentDialog(false);
            });
    }

    const handleLikeClick = (event, commentId) => {
        PostService.addCommentLike(props.postId, commentId)
            .then(response => {
                const updatedComments = [...comments];
                updatedComments.forEach((element) => {
                    if (element.id === commentId) {
                        element.likesCount++;
                    }
                })
                setComments(updatedComments);
            })
            .catch(error => {
                props.onError(error);
            });
    }

    const handleDislikeClick = (event, commentId) => {
        PostService.addCommentDislike(props.postId, commentId)
            .then(response => {
                const updatedComments = [...comments];
                updatedComments.forEach((element) => {
                    if (element.id === commentId) {
                        element.dislikesCount++;
                    }
                })
                setComments(updatedComments);
            })
            .catch(error => {
                props.onError(error);
            });
    }
    const handleAddCommentCancel = () => {
        setOpenAddCommentDialog(false);
        setCommentToAdd("");
    }

    const handleCommentToAddChange = (event) => {
        setCommentToAdd(event.target.value);
    }

    const handleMoreCommentsClick = (event) => {
        event.preventDefault();
        PostService.getPostComments(props.postId, page + 1, rowsPerPage)
            .then((response) => {
                setComments(comments.concat(response.data.content));
                setPage(page + 1);
                setTotalCommentPages(response.data.totalPages)
            })
            .catch()
    }

    const handleAddCommentClick = () => {
        setOpenAddCommentDialog(true);
    }

    const handleAddCommentConfirm = () => {
        PostService.addComment(props.postId, commentToAdd)
            .then(response => {
                setCommentToAdd("");
                setOpenAddCommentDialog(false);
                props.onMessageInfo(COMMENT_ADD_SUCCESS);
                setPage(0);
                return PostService.getPostComments(props.postId, 0, rowsPerPage);
            })
            .then((response) => {
                console.log(response.data);
                setComments(response.data.content);
                setTotalCommentPages(response.data.totalPages)
            })
            .catch(error => {
                props.onError(error);
            })
    }

    const handleDeleteCommentCancel = () => {
        setOpenDeleteCommentDialog(false);
        setCommentIdForDelete("");
    }

    return (
        <React.Fragment>
            <div className={`${classes.flex} ${classes.directionColumn}`}>
                {comments.map(({id, content, likesCount, dislikesCount, createdDate, createdBy}) => (
                    <React.Fragment key={id}>
                        <div className={` ${classes.flex} ${classes.alignItemsBaseLine}`}>
                            <div
                                className={`${classes.marginLeft15} ${classes.marginRight25} ${classes.italic}`}>{createdBy}</div>
                            <div className={classes.flexGrow1}>{content}</div>
                            <div className={`${classes.flexNoWrap} ${classes.minWidth85}`}>{createdDate}</div>
                            <div onClick={e => handleLikeClick(e, id)}>
                                <IconButton aria-label="add to favorites">
                                    <ThumbUpSharpIcon fontSize="small" color="primary"/>
                                </IconButton>
                            </div>
                            <div className={`${classes.flexNoWrap} ${classes.minWidth20}`}>{likesCount}</div>
                            <div className={classes.minWidth45} onClick={e => handleDislikeClick(e, id)}>
                                <IconButton aria-label="share">
                                    <ThumbDownSharpIcon fontSize="small" color="secondary"/>
                                </IconButton>
                            </div>
                            <div className={`${classes.flexNoWrap} ${classes.minWidth20}`}>{dislikesCount}</div>

                            <div className={classes.minWidth45}>
                                {createdBy === UserService.getUserLogin() && UserService.isValidAuthentification() &&
                                <IconButton edge="end" aria-label="delete"
                                            onClick={(e) => handleDeleteCommentClick(e, id)}>
                                    <DeleteIcon/>
                                </IconButton>
                                }
                            </div>
                        </div>
                        <Divider variant="inset"/>
                    </React.Fragment>
                ))}
            </div>
            {totalCommentPages - 1 > page &&
            <Typography align='right' className={`${classes.italic} ${classes.marginRight25}`}>
                <Link href="#" onClick={handleMoreCommentsClick}>
                    {SHOW_MORE_COMMENTS}
                </Link>
            </Typography>
            }
            {UserService.isValidAuthentification() &&
            <CardActions disableSpacing className={classes.alignRight} onClick={handleAddCommentClick}>
                <Tooltip title="Add a comment">
                    <IconButton>
                        <ChatIcon color="primary"/>
                    </IconButton>
                </Tooltip>
            </CardActions>
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
                        className={ `${classes.flex} ${classes.fullWidth}`}
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
            <CommentsCountPortalTest value={comments.length}/>
        </React.Fragment>);
}

function CommentsCountPortalTest(props) {
    const topBarDiv = document.getElementById("topBarDiv");

    return topBarDiv
        ? ReactDOM.createPortal(<p>Comments count: {props.value}</p>, topBarDiv)
        : null;
}
