import React from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import {Home} from "./sections/Home";
import {Products} from "./sections/Products";
import {Categories} from "./sections/Categories";
import {NotFound} from "./sections/NotFound";
import {Box, Container} from "@material-ui/core";
import AppNavigation from "./components/AppNavigation";

function App() {
  return (
    <Container maxWidth="md">
      <BrowserRouter>
          <AppNavigation/>
          <Box mt={10}>
              <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/products" component={Products} />
                      <Route exact path="/categories" component={Categories} />
                      <Route component={NotFound} />
              </Switch>
          </Box>
      </BrowserRouter>
    </Container>
  );
}

export default App;
