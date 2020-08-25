import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    createStyles,
    Grid,
    TextField,
    Theme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {RouteComponentProps} from "react-router-dom";
import axios from "../../lib/axios";

interface MatchParams {
    id: string;
}

export const AddCategory = ({match, history}: RouteComponentProps<MatchParams>) => {
    const classes = useStyles();
    const [title, setTitle] = useState("");

    useEffect(() => {

        const getCategoryById = async (id: string) => {
            const { title } = await axios.get("/categories/" + id);
            setTitle(title)
        };

        if (match.params.id) {
           getCategoryById(match.params.id )
        }
    }, [])

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (match.params.id) {
                await axios.put("/categories/" + match.params.id, {title});
            } else {
                await axios.post("/categories", {title});
            }

            history.push("/categories");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form className={classes.root} autoComplete="off" onSubmit={formSubmitHandler}>
                        <Card className={classes.root} variant="outlined">
                            <CardHeader title={ match.params.id ? "Edit category" : "Add new category"}/>
                            <CardContent>
                                <TextField required id="standard-required"
                                           label="Title"
                                           value={title}
                                           fullWidth
                                           onChange={inputChangeHandler}
                                />
                            </CardContent>
                            <CardActions>
                                <Box mr={1}>
                                    <Button type="submit" color="primary" variant="outlined" size="large">Save</Button>
                                </Box>
                                <Box>
                                    <Button type="submit" color="secondary"
                                            variant="outlined"
                                            size="large"
                                            onClick={() => history.push("/categories")}>
                                        Cancel
                                    </Button>
                                </Box>
                            </CardActions>
                        </Card>
                    </form>
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