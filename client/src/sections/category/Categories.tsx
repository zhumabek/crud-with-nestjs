import React from "react";
import {Button, createStyles, Grid, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CategoryTable from "../../components/CategoryTable";
import {useHistory} from "react-router-dom";
export const Categories = () => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button variant="outlined" color="primary" onClick={() => history.push("/category")}>
                        Add new category
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <CategoryTable/>
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