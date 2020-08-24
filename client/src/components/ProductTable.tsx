import React, { Fragment, useState, useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Avatar, Button, TablePagination, Typography} from "@material-ui/core";
import {ProductData} from "../lib/types";
import axios from "../lib/axios";

interface ResponseData {
    result: ProductData[];
    total: number;
}

const rowsPerPageOptions = [5, 10, 25];

const ProductTable = () => {
    const classes = useStyles();
    const [products, setProducts] = useState<ProductData[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
    };

    useEffect( () => {
        const getProducts = async () => {
            try {
                const { result, total } : ResponseData = await axios.get(`/products?page=${page}&limit=${rowsPerPage}`);
                setProducts(result);
                setTotal(total);
            } catch (e) {
                console.log(e)
            }
        };

        getProducts();
    }, [page, rowsPerPage]);

    return (
        <Fragment>
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
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.length < 1 ? <Typography variant="h6" component="h6"> No data... </Typography> : null }
                        {products.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.description.substr(0, 40)}</TableCell>
                                <TableCell>
                                    <Avatar src={row.image} variant="square" className={classes.largeImage} />
                                </TableCell>
                                <TableCell>{row.category && row.category.title}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" size="small" color="primary">
                                        edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" size="small" color="secondary">
                                        delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}/>
        </Fragment>
    );
}

export default ProductTable;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
        largeImage: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    })
);
