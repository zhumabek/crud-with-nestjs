import React, {FunctionComponent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Typography} from "@material-ui/core";
import {ProductData} from "../lib/types";

interface ProductTableProps {
    data: ProductData[],
}

const ProductTable: FunctionComponent<ProductTableProps> = ({data}) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length < 1 ? <Typography variant="h6" component="h6"> No data... </Typography> : null }
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.image}</TableCell>
                            <TableCell>{row.category && row.category.title}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="primary">
                                    редактировать
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="secondary">
                                    удалить
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProductTable;

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
