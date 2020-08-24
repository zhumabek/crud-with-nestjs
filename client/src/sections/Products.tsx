import React from "react";
import {Button, createStyles, Grid, Theme} from "@material-ui/core";
import ProductTable from "../components/ProductTable";
import {makeStyles} from "@material-ui/core/styles";

export const Products = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button variant="outlined" color="primary">
                        Добавить продукт
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <ProductTable/>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        }
    }),
);