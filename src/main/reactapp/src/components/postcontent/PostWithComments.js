import React, {useEffect, useState} from "react";
import {Container} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ThumbDownSharpIcon from '@material-ui/icons/ThumbDownSharp';
import ThumbUpSharpIcon from '@material-ui/icons/ThumbUpSharp';
import IconButton from '@material-ui/core/IconButton';
import PostService from "../../services/PostService";
import {useStyles} from "../../utils/AppStyle";

export default function PostWithComments(props){
    const classes = useStyles();
    const { postId } = useParams();
    const [ post, setPost ] = useState({
        title: '',
        createdDate: "",
        content: ""
    });
    
    useEffect(() => {
        PostService.getPostById(postId)
            .then(response => {
                console.log(response.data);
                setPost(response.data);
            })
            .catch()
    }, []);
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
                <CardActions disableSpacing className={classes.alignRight}>
                    <IconButton aria-label="add to favorites">
                        <ThumbUpSharpIcon  color="primary"/>
                    </IconButton>
                    <IconButton aria-label="share">
                        <ThumbDownSharpIcon color="secondary"/>
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
}