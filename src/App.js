import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/ui/Loading";
import Footer from "./components/ui/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import AddProduct from "./components/product/addProduct";
import ProductGrid from "./components/product/products";
import ProductDetails from "./components/product/productDetails";
import Cart from "./components/cart";
import { NavbarChakra } from "./components/ui/navbarChakra";
import Checkout from "./components/checkout";
initFontAwesome();

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavbarChakra />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
            <Route path="/add-product" component={AddProduct} />
            <Route path="/product/:productId" component={ProductDetails} />
            <Route path="/product" component={ProductGrid} />
            <Route
              path="/cart"
              render={(props) => <Cart {...props} {...props} reusable={true} />}
            />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
