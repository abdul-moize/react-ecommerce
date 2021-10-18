import { Route, Switch } from "react-router";
import { useState } from "react";
import { AUTH, HOMEPAGE } from "./constants";
import Header from "./components/header";
import Homepage from "./pages/homepage";
import LoginOrRegister from "./pages/loginOrRegister";
import LogOut from "./pages/logout";
import { AddProduct } from "./pages/addProduct";
import ProductDetail from "./pages/productDetail";
require("dotenv").config();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <Switch>
        <Route path={AUTH} exact>
          <LoginOrRegister setLoggedIn={setLoggedIn} />
        </Route>
        <Route path={HOMEPAGE} exact>
          <Homepage />
        </Route>
        <Route path="/add" exact>
          <AddProduct />
        </Route>

        <Route path="/orders"></Route>

        {/* <Route path="/cart">
          <CartDetail />
        </Route> */}

        <Route path="/logout">
          <LogOut setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="profile"></Route>
        <Route
          path={`${HOMEPAGE}:product_id(\\d+)`}
          exact
          render={({ match, props, location }) => (
            <div>
              <ProductDetail id={match.params.product_id} />
            </div>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
