import React, {useEffect, useState} from 'react';
import '../App.css';
import ForumLogo from '../images/forum8.png'
import {makeStyles} from '@material-ui/core/styles';
import TopAppBar from "./appbar/TopAppBar";
import BottomAppBar from "./appbar/BottomAppBar";
import PostListContent from "./postcontent/PostListContent";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(1),
        backgroundColor: 'white',
        borderRadius: '5px',
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(236, 236, 243, 0.9)),url(${ForumLogo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
    },
    forumLogo: {
        marginRight: 'auto',
        width: '30%',
        height: '150px'
    },
    paper: {
        marginTop: theme.spacing(1),
        paddingBottom: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    overflow: {
        overflowX: 'auto'
    }
}));

function MainPage2() {
    const classes = useStyles();

    return (
        <div className={classes.overflow}>
            <TopAppBar/>
            <PostListContent />
            <BottomAppBar/>
        </div>
    );
}

export default MainPage2;
