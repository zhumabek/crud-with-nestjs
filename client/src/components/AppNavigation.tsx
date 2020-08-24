import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import { NavLink, withRouter} from "react-router-dom";

function AppNavigation() {
    const classes = useStyles();

    return (
            <AppBar position="fixed">
                <Toolbar>
                    <Typography className={classes.menuItems}>
                        <NavLink to="/products"
                                 className={classes.menuItem}
                                 activeClassName={classes.activeMenuItem}
                        >
                            Продукты
                        </NavLink>
                        <NavLink to="/categories"
                                 className={classes.menuItem}
                                 activeClassName={classes.activeMenuItem}
                        >
                            Категории
                        </NavLink>
                    </Typography>
                </Toolbar>
            </AppBar>
    );
}

export default withRouter(AppNavigation);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuItems: {
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
        menuItem: {
            color: "white",
            padding: "10px 15px",
            textDecoration: 'none',

            '&:hover': {
                backgroundColor: "rgba(0, 0, 0, 0.09)"
            },
        },
        activeMenuItem: {
            backgroundColor: "rgba(0, 0, 0, 0.09)"
        }
    }),
);
