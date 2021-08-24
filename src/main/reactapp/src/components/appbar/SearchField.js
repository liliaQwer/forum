import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import React from "react";
import {useStyles} from "../../utils/AppStyle";

export default function SearchField(props) {
    const classes = useStyles();

    const handleKeyPress = (event)=> {
        if (event.keyCode === 13) {
            console.log("event.target.value=" + event.target.value);
            props.onPressEnter(event.target.value);
        }
    }

    return (
        <div className={`${classes.search} ${props.classname}`} >
            <div className={classes.searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase
                onKeyUp={handleKeyPress}
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
            />
        </div>
    );
}
