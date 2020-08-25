import React from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import {Home} from "./sections/Home";
import {Products} from "./sections/product/Products";
import {Categories} from "./sections/category/Categories";
import {NotFound} from "./sections/NotFound";
import {Box, Container} from "@material-ui/core";
import AppNavigation from "./components/AppNavigation";
import AppBar from "@material-ui/core/AppBar";
import {AddCategory} from "./sections/category/AddCategory";
import AddProduct from "./sections/product/AddProduct";

function App() {
  return (
    <Container maxWidth="md">
      <BrowserRouter>
          <AppBar position="fixed">
                  <AppNavigation/>
          </AppBar>
          <Box mt={12}>
              <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/products" component={Products} />
                      <Route exact path="/product" component={AddProduct} />
                      <Route exact path="/product/:id" component={AddProduct} />
                      <Route exact path="/category" component={AddCategory} />
                      <Route exact path="/category/:id" component={AddCategory} />
                      <Route exact path="/categories" component={Categories} />
                      <Route component={NotFound} />
              </Switch>
          </Box>
      </BrowserRouter>
    </Container>
  );
}

export default App;
