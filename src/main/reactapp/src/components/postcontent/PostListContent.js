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
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {Alert} from "@material-ui/lab";
import ErrorService from "../../services/ErrorService";
import InfoDialog from "../utility/InfoDialog";
import UserService from "../../services/UserService";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import SearchField from "../appbar/SearchField";
import {useStyles} from "../../utils/AppStyle";

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
    const [category, setCategory] = useState(0);
    const [categoryList, setCategoryList] = useState([]);
    const [contentToFind, setContentToFind] = useState('');
    const history = useHistory();

    useEffect(() => {
        PostService.getCategoryList()
            .then(response => {
                console.log(response.data);
                const categoryArray = response.data;
                setCategoryList(categoryArray.map((value, index) => ({id: index, value: value})));
                console.log(categoryArray.map((value, index) => ({id: index, value: value})));
                setCategory(0);
            })
            .catch()
    }, []);

    useEffect(() => {
        if (categoryList.length === 0) {
            return;
        }
        getPostList(page, rowsPerPage, category, contentToFind);
    }, [page, rowsPerPage, category, categoryList]);


    const getPostList = (page, rowsPerPage, category, content) => {
        console.log(categoryList);
        const categoryValue = categoryList.filter((element) => element.id === category)[0].value;
        PostService.getPostList(page, rowsPerPage, categoryValue, content)
            .then(response => {
                setPosts(response.data.content);
                setTotalElements(response.data.totalElements);
            })
            .catch(error => {
                ErrorService.showAppropriateError(error, setServerError);
                setServerErrorOn(true);
            });
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setPage(0);
        setTotalElements(0);
    };

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

    function changeContentToFind(content) {
        console.log("content=" + content);
        setContentToFind(content);
        getPostList(0, rowsPerPage, category, content)
    }

    return (
        <Container className={classes.paper}>
            <Grid container justify='space-between'>
                <Grid item>
                    <Typography className={`${classes.caption} ${classes.italic}`} variant='h5' gutterBottom>
                        {POST_LIST_CAPTION}
                    </Typography>
                </Grid>
                <Grid item>
                    <SearchField onPressEnter={changeContentToFind} classname={classes.marginTop15}/>
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" className={classes.marginTop15}>
                        <InputLabel id="categoryInputLabel">Category</InputLabel>
                        <Select
                            labelId="categoryInputLabel"
                            id="categoryList"
                            value={category}
                            onChange={handleCategoryChange}
                            label="Category"
                        >
                            {categoryList.map(({id, value}) => (
                                <MenuItem key={id} value={id}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <List className={classes.list}>
                {posts.map(({id, title, description,createdDate, category, createdBy}) => (
                    <React.Fragment key={id}>
                        <ListItem button onClick={(e) => handlePostClick(e, id)}>
                            <ListItemAvatar className={`${classes.flex}`}>
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={title} secondary={description}
                                          className={`${classes.grow} ${classes.width2}`}/>
                            <ListItemText secondary={category}
                                          className={`${classes.width2} ${classes.alignRight} ${classes.flex} ${classes.italic}`}/>
                            <ListItemText secondary={new Date(createdDate).toDateString()}
                                          className={`${classes.width2} ${classes.alignRight} ${classes.flex} ${classes.blueColor}`}/>
                            {createdBy === UserService.getUserLogin() && UserService.isValidAuthentification() && <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={(e) => handleDeletePost(e, id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                            }
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