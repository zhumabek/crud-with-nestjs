import React, {FormEvent, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    createStyles,
    Grid, TextareaAutosize,
    TextField,
    Theme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {RouteComponentProps} from "react-router-dom";
import axios from "../../lib/axios";
import {CategoryData, ProductData} from "../../lib/types";
import AutoCompleteSelect from "../../components/AutoComplete";
import TableCell from "@material-ui/core/TableCell";
import {fileToBase64} from "../../lib/toBase64";
import {log} from "util";

interface MatchParams {
    id: string;
}

interface GetCategoriesResponseData {
    result: CategoryData[];
    total: number;
}

const AddProduct = ({match, history}: RouteComponentProps<MatchParams>) => {
    const classes = useStyles();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState({ title: "", id: "" });
    const [image, setImage] = useState("");
    const [categories, setCategories] = useState<CategoryData[]>([]);

    useEffect(() => {

        const getProductById = async (id: string) => {
            const {title, description, price, image, category}: ProductData = await axios.get("/products/" + id);
            setTitle(title);
            setDescription(description);
            setPrice(price);
            setCategory(category);
            setImage(image);
        };

        const getCategories = async () => {
            try {
                const { result } : GetCategoriesResponseData = await axios.get(`/categories`);
                setCategories(result);
            } catch (e) {
                console.log(e)
            }
        };

        if (match.params.id) {
           getProductById(match.params.id )
        }

        getCategories();
    }, [])

    const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = {
                title,
                description,
                price,
                categoryId: category.id,
                image
            };

            if (match.params.id) {
                await axios.put("/products/" + match.params.id, data);
            } else {
                await axios.post("/products", data);
            }

            history.push("/products");

        } catch (e) {
            console.log(e);
        }
    };

    const canSubmitForm = () => {
        return title && description && price && image && category
    };

    const uploadImageHandler = (event: any) => {
        fileToBase64(event.target.files[0]).then(result => {
            if ((typeof result === "string")){
                setImage(result)
            }
        })
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form className={classes.root} autoComplete="off" onSubmit={formSubmitHandler}>
                        <Card className={classes.root} variant="outlined">
                            <CardHeader title={ match.params.id ? "Editing product" : "Add new product" }/>
                            <CardContent>
                                <Box py={2}>
                                    <TextField required id="standard-required"
                                               label="Title"
                                               value={title}
                                               fullWidth
                                               onChange={event => setTitle(event.target.value)}
                                    />
                                </Box>
                                <Box py={2}>
                                    <TextareaAutosize aria-label="minimum height"
                                                  rowsMin={5}
                                                  cols={70}
                                                  placeholder="Description..."
                                                  value={description}
                                                  onChange={event => setDescription(event.target.value)}
                                    />
                                </Box>
                                <Box py={2}>
                                    <TextField required id="standard-required"
                                           label="Price"
                                           type="number"
                                           value={price}
                                           fullWidth
                                           onChange={event => setPrice(parseInt(event.target.value))}
                                    />
                                </Box>
                                <Box py={2}>
                                    <AutoCompleteSelect
                                               onChange={(event, value) => setCategory(value)}
                                               options={categories}
                                               optionLabel="title"
                                               defaultValue={category}
                                    />
                                </Box>
                                <Box py={2}>
                                    <Grid container>
                                        <Grid item xs={12} md={4}>
                                            <input
                                                accept="image/*"
                                                id="contained-button-file"
                                                multiple
                                                type="file"
                                                onChange={uploadImageHandler}
                                                style={{display: "none"}}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Button variant="outlined" color="primary" component="span" size="large">
                                                    Upload image
                                                </Button>
                                            </label>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <Avatar src={image} variant="square" className={classes.imagePreview} />
                                        </Grid>
                                    </Grid>
                                </Box>

                            </CardContent>
                            <CardActions>
                                <Box mr={1}>
                                    <Button type="submit"
                                            color="primary"
                                            variant="outlined"
                                            size="large" disabled={!canSubmitForm()}>
                                        Save
                                    </Button>
                                </Box>
                                <Box>
                                    <Button type="submit" color="secondary"
                                            variant="outlined"
                                            size="large"
                                            onClick={() => history.push("/products")}>
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

export default AddProduct;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        imagePreview: {
            width: theme.spacing(50),
            height: theme.spacing(35),
        }
    }),
);