import React, {useEffect, useState} from "react";
import {Container} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {useParams} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import PostService from "../../services/PostService";
import ErrorService from "../../services/ErrorService";
import {Alert} from "@material-ui/lab";
import {useStyles} from "../../utils/AppStyle";
import Comments from "./Comments";

export default function PostWithComments(props) {
    const classes = useStyles();
    const {postId} = useParams();
    const [post, setPost] = useState({
        title: '',
        createdDate: "",
        content: ""
    });
    const [serverErrorOn, setServerErrorOn] = useState(false);
    const [serverError, setServerError] = useState();
    const [infoMessageOn, setInfoMessageOn] = useState(false);
    const [infoMessage, setInfoMessage] = useState();

    useEffect(() => {
        PostService.getPostById(postId)
            .then(response => {
                console.log(response.data);
                setPost(response.data);
            })
            .catch(error => {
                errorHandler(error);
            })
    }, []);

    const errorHandler = (error) => {
        ErrorService.showAppropriateError(error, setServerError);
        setServerErrorOn(true);
        setTimeout(() => setServerErrorOn(false), 3000);
    }

    const messageInfoHandler = (info) => {
        setInfoMessage(info);
        setInfoMessageOn(true);
        setTimeout(() => setInfoMessageOn(false), 3000);
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
                <Comments postId={postId}
                          onError={errorHandler}
                          onMessageInfo={messageInfoHandler}>
                </Comments>

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
            </Card>

        </Container>
    );
}