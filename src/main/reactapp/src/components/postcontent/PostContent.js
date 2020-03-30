import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {blueGrey} from "@material-ui/core/colors";
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
        avatar: {
            backgroundColor: blueGrey[500],
            width: theme.spacing(4),
            height: theme.spacing(4),
            textAlign: 'center'
        },
    })
);

export default function PostContent(props){
    const classes = useStyles();
    const { postId } = useParams();
    console.log(`postId=${postId}`);

    return (
        <Container>
            <Box>
                <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                </Avatar>
                <Typography>fdsdfs
                </Typography>
                <Typography>sfsdfsdfs
                </Typography>
            </Box>
            <Box>sdsfsds
            </Box>
            <Divider/>
        </Container>
    );
}