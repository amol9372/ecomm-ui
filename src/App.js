import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Loading from "./components/ui/Loading";
import Footer from "./components/ui/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import "./App.css";
import initFontAwesome from "./utils/initFontAwesome";
import AddProduct from "./components/product/addProduct";
import ProductGrid from "./components/product/products";
import ProductDetails from "./components/product/productDetails";
import Cart from "./components/order-checkout/cart";
import { NavbarChakra } from "./components/ui/navbarChakra";
import Checkout from "./components/order-checkout/checkout";
import LoginUser from "./components/user-auth/loginUser";
import { MyComponent } from "./components/testcomponent";
import { useCustomAuth } from "./components/user-auth/authContext";
import { OrderSubmitted } from "./components/ui/orderSubmitted";
initFontAwesome();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const { user, isLoading, error } = useAuth0();
  const { appUser } = useCustomAuth();

  useEffect(() => {
    const loggedUser = appUser() ? appUser() : user;
    if (loggedUser) {
      setLoggedInUser(loggedUser);
      history.push("/home");
    } else {
      history.push("/login");
    }
  }, []);

  // if (error) {
  //   return <div>Oops... {error.message}</div>;
  // }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavbarChakra />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/login" exact component={LoginUser} />
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
            <Route path="/test" exact component={MyComponent} />
            <Route path="/order-submitted" exact component={OrderSubmitted} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
