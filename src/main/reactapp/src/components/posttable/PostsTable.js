import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {Box, makeStyles} from "@material-ui/core";
import React from "react";
import {blueGrey} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 750,
    },
    avatar: {
        backgroundColor: blueGrey[500],
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

export default function PostsTable(props){
    const classes = useStyles();
    const page = props.page;
    const rowsPerPage = props.rowsPerPage;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);

    return (
        <TableContainer>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={'medium'}
                aria-label="enhanced table"
            >
                <TableBody>
                    {props.rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={row.name}
                                >
                                    <TableCell padding="none">
                                        <Typography color="textPrimary">
                                            {row.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography color="textSecondary">
                                            {row.definition}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography color="textSecondary">
                                            {row.createDate}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            R
                                        </Avatar>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    {emptyRows > 0 && (
                        <TableRow style={{height: (53) * emptyRows}}>
                            <TableCell colSpan={5}/>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
