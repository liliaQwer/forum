import React from "react";
import NewPost from "@material-ui/icons/AddCommentOutlined";
import IconButton from "@material-ui/core/IconButton";
import {POST_API_URL} from "../../utils/Url";
import {useHistory} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

export default function AddPostButton() {
    const history = useHistory();

    const showAddPostPage = (event) => {
        event.preventDefault();
        history.push(`${POST_API_URL}`);
    };

    return (
        <Tooltip title={'Add a post'}>
            <IconButton color="inherit" onClick={showAddPostPage}>
                <NewPost/>
            </IconButton>
        </Tooltip>
    );
}