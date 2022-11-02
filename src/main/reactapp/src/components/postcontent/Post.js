import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {MAX_LENGTH, REQUIRED_FIELD} from "../../utils/ErrorMessages";
import {
    MAX_DESCRIPTION_LENGTH,
    MAX_TITLE_LENGTH,
    MAX_CONTENT_LENGTH
} from "../../utils/ValidationRules";
import {POSTS} from "../../utils/Url";
import {
    ADD,
    EDIT,
    GO_TO_MAIN_PAGE,
    POST_ADD_CAPTION,
    POST_ADD_SUCCESS,
    POST_EDIT_CAPTION, POST_EDIT_SUCCESS
} from "../../utils/AppConstants";
import {useStyles} from "../../utils/AppStyle";
import ErrorService from "../../services/ErrorService";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PostService from "../../services/PostService";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Link from "@material-ui/core/Link";

export default function () {
    const classes = useStyles();

    const [category, setCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [version, setVersion] = useState(0);
    const [serverError, setServerError] = useState("");
    const [serverErrorOn, setServerErrorOn] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [infoMessageOn, setInfoMessageOn] = useState(false);
    const {postId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        PostService.getCategoryList()
            .then(response => {
                console.log(response.data);
                const categoryArray = response.data.slice(1);//remove first element with the category "ALL"
                setCategoryList(categoryArray.map((value, index) => ({id: index + 1, value: value})));
            })
            .catch()
    }, []);

    useEffect(() => {
        if (categoryList.length !== 0) {
            if (postId) {
                getPostAndFillFields();
            } else {
                setCategory(1);
            }
        }
    }, [categoryList])

    const getPostAndFillFields = () => {
        PostService.getPostById(postId)
            .then(response => {
                console.log(response.data);
                setTitle(response.data.title);
                setCategory(getCategoryIdByValue(response.data.category));
                setDescription(response.data.description);
                setContent(response.data.content);
                setVersion(response.data.version);
            })
            .catch()
    }

    const getCategoryIdByValue = (value) => {
        return categoryList.filter((element) => element.value === value)[0].id;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("onsubmit");
        setShowLoading(true);
        if (postId) {
            PostService.editPost(postId, title, category, description, content, version)
                .then(
                    response => {
                        setShowLoading(false);
                        messageInfoHandler();
                        getPostAndFillFields();
                    }
                )
                .catch(
                    error => {
                        setShowLoading(false);
                        ErrorService.showAppropriateError(error, setServerError);
                        setServerErrorOn(true);
                    });
            return;
        }
        PostService.addPost(title, category, description, content)
            .then(
                response => {
                    setShowLoading(false);
                    messageInfoHandler();
                    // history.push(`/${POSTS}`);
                    clearAllFields();
                }
            )
            .catch(
                error => {
                    setShowLoading(false);
                    ErrorService.showAppropriateError(error, setServerError);
                    setServerErrorOn(true);
                });
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        setServerErrorOn(false);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setServerErrorOn(false);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        setServerErrorOn(false);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
        setServerErrorOn(false);
    };

    const clearAllFields = () => {
        setTitle("");
        setCategory(1);
        setDescription("");
        setContent("");
    }

    const handleGoToMainPage = () => {
        navigate(`/${POSTS}`);
    }

    const messageInfoHandler = () => {
        setInfoMessageOn(true);
        // setTimeout(() => setInfoMessageOn(false), 3000);
    }

    return (
        <Container className={classes.paper}>
            <Typography className={`${classes.caption} ${classes.italic}`} variant="h5" gutterBottom>
                {postId ? POST_EDIT_CAPTION : POST_ADD_CAPTION}
            </Typography>
            <input type="hidden" value={version}/>
            <ValidatorForm
                className={classes.form}
                onSubmit={handleSubmit}
                debounceTime={500}
            >
                <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    autoFocus
                    validators={['required', `maxStringLength:${MAX_TITLE_LENGTH}`]}
                    errorMessages={[REQUIRED_FIELD, MAX_LENGTH(MAX_TITLE_LENGTH)]}
                    className={classes.halfWidth}
                />
                <FormControl variant="outlined" className={classes.halfWidth}>
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
                <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    validators={['required', `maxStringLength:${MAX_DESCRIPTION_LENGTH}`]}
                    errorMessages={[REQUIRED_FIELD, MAX_LENGTH(MAX_DESCRIPTION_LENGTH)]}
                />
                <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    multiline
                    rows={8}
                    name="content"
                    label="Content"
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                    validators={['required', `maxStringLength:${MAX_CONTENT_LENGTH}`]}
                    errorMessages={[REQUIRED_FIELD, MAX_LENGTH(MAX_CONTENT_LENGTH)]}
                />
                {serverErrorOn &&
                <Alert severity="error">
                    {serverError}
                </Alert>
                }
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={`${classes.submit} ${classes.halfWidth}`}
                >
                    {postId ? EDIT : ADD}
                </Button>
            </ValidatorForm>
            <Link href="#" className={classes.greenColor} onClick={handleGoToMainPage}>
                {GO_TO_MAIN_PAGE}
            </Link>
            <Backdrop className={classes.backdrop} open={showLoading} onClick={() => {
                setShowLoading(false)
            }}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            {/*<Dialog onClose={handleDialogClose} aria-labelledby="simple-dialog-title" open={showAddConfirm}>*/}
            {/*    <DialogTitle id="simple-dialog-title">{postId ? POST_EDIT_SUCCESS : POST_ADD_SUCCESS}</DialogTitle>*/}
            {/*</Dialog>*/}
            {infoMessageOn &&
            <Alert severity="success" className={classes.marginTop15}>
                {postId ? POST_EDIT_SUCCESS : POST_ADD_SUCCESS}
            </Alert>
            }
        </Container>
    );
}
