import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {MAX_LENGTH, REQUIRED_FIELD} from "../../utils/ErrorMessages";
import {
    MAX_DESCRIPTION_LENGTH,
    MAX_TITLE_LENGTH,
    MAX_CONTENT_LENGTH
} from "../../utils/ValidationRules";
import {POSTS} from "../../utils/Url";
import {ADD, ANONYMOUS_USER, GO_TO_MAIN_PAGE, POST_ADD_CAPTION, POST_ADD_SUCCESS} from "../../utils/AppConstants";
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
    const [serverError, setServerError] = useState("");
    const [serverErrorOn, setServerErrorOn] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showAddConfirm, setShowAddConfirm] = useState(false);

    const history = useHistory();

    useEffect(() => {
        PostService.getCategoryList()
            .then(response => {
                console.log(response.data);
                const categoryArray = response.data.slice(1);//remove first element with the category "ALL"
                setCategoryList(categoryArray.map((value,index)=>({id: index + 1, value: value})));
                setCategory(1);
            })
            .catch()
    },[]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("onsubmit");
        setShowLoading(true);
        PostService.addPost(title, category, description, content)
            .then(
                response => {
                    setShowLoading(false);
                    setShowAddConfirm(true);
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

    const handleDialogClose = () => {
        setShowAddConfirm(false);
    }

    const clearAllFields = () => {
        setTitle("");
        setCategory(1);
        setDescription("");
        setContent("");
    }

    const handleGoToMainPage = () => {
        history.push(`/${POSTS}`);
    }

    return (
        <Container className={classes.paper}>
            <Typography className={`${classes.caption} ${classes.italic}`} variant="h5" gutterBottom>
                {POST_ADD_CAPTION}
            </Typography>
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
                        {categoryList.map(({ id, value }) => (
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
                    {ADD}
                </Button>
            </ValidatorForm>
            <Link href="#" className={classes.greenColor}  onClick={handleGoToMainPage}>
                {GO_TO_MAIN_PAGE}
            </Link>
            <Backdrop className={classes.backdrop} open={showLoading} onClick={()=>{setShowLoading(false)}}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog onClose={handleDialogClose} aria-labelledby="simple-dialog-title" open={showAddConfirm}>
                <DialogTitle id="simple-dialog-title">${POST_ADD_SUCCESS}</DialogTitle>
            </Dialog>
        </Container>
    );
}
