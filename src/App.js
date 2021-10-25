import { Route, Switch } from "react-router";
import CartDetail from "./pages/cartDetail";
import { AUTH, HOMEPAGE } from "./constants";
import Header from "./components/header";
import Homepage from "./pages/homepage";
import LoginOrRegister from "./pages/loginOrRegister";
import LogOut from "./pages/logout";
import AddProduct from "./pages/addProduct";
import ProductDetail from "./pages/productDetail";
import Orders from "./pages/orders";
import Profile from "./pages/profile";
import { UserContextProvider } from "./store/userContext";
require("dotenv").config();

function App() {
  return (
    <UserContextProvider>
      <Header />
      <Switch>
        <Route path={AUTH} exact>
          <LoginOrRegister />
        </Route>
        <Route path={HOMEPAGE} exact>
          <Homepage />
        </Route>
        <Route path="/add" exact>
          <AddProduct />
        </Route>

        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/orders" exact></Route>

        <Route path="/cart">
          <CartDetail />
        </Route>

        <Route path="/logout">
          <LogOut />
        </Route>

        <Route
          path={`${HOMEPAGE}:product_id(\\d+)`}
          exact
          render={({ match, props, location }) => (
            <ProductDetail id={match.params.product_id} />
          )}
        />
      </Switch>
    </UserContextProvider>
  );
}

export default App;
