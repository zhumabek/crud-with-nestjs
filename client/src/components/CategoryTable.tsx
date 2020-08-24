import React, { Fragment, useState, useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Box, Button, TablePagination, Typography} from "@material-ui/core";
import { CategoryData } from "../lib/types";
import axios from "../lib/axios";
import {useHistory} from "react-router-dom";

interface GetCategoriesResponseData {
    result: CategoryData[];
    total: number;
}

const rowsPerPageOptions = [5, 10, 25];

const CategoryTable = () => {
    const history = useHistory();
    const classes = useStyles();
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
    };

    const deleteCategory = async (id: number) => {
        try {
            const { message } = await axios.delete(`/categories/${id}`);
            getCategories(page, rowsPerPage);
        } catch (e) {
            console.log(e)
        }
    }

    const getCategories = async (page: number, limit: number) => {
        try {
            const { result, total } : GetCategoriesResponseData = await axios.get(`/categories?page=${page}&limit=${limit}`);
            setCategories(result);
            setTotal(total);
        } catch (e) {
            console.log(e)
        }
    };

    useEffect( () => {
        getCategories(page, rowsPerPage);
    }, [page, rowsPerPage]);

    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.length < 1 ? <Typography variant="h6" component="h6"> No data... </Typography> : null }
                        {categories.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Box mr={1}>
                                            <Button variant="outlined"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => history.push("/category/" + row.id)}>
                                                edit
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button variant="outlined"
                                                    size="small"
                                                    color="secondary"
                                                    onClick={() => deleteCategory(row.id)}
                                            >
                                                delete
                                            </Button>
                                        </Box>
                                    </Box>
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

export default CategoryTable;

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
