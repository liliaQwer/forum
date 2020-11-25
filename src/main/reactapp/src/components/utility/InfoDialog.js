import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export default function (props) {
    return (
        <Dialog
            open={props.openDialog}
            onClose={props.handleCancel}
            aria-labelledby="alert-dialog-title"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogActions>
                <Button onClick={props.handleConfirm} color="primary">
                    {props.confirmText}
                </Button>
                <Button onClick={props.handleCancel} color="primary" autoFocus>
                    {props.cancelText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
