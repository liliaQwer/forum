import React from "react";
import NewPost from "@material-ui/icons/AddCommentOutlined";
import IconButton from "@material-ui/core/IconButton";
import {POST_API_URL} from "../../utils/Url";
import {useNavigate} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

export default function AddPostButton() {
    const navigate = useNavigate();

    const showAddPostPage = (event) => {
        event.preventDefault();
        navigate(`${POST_API_URL}`);
    };

    return (
        <Tooltip title={'Add a post'}>
            <IconButton color="inherit" onClick={showAddPostPage}>
                <NewPost/>
            </IconButton>
        </Tooltip>
    );
}