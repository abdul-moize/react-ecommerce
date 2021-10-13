import { Route, Switch } from 'react-router';
import { useState } from 'react/cjs/react.development';
import { AddProduct } from './pages/addProduct';
import CartDetail from './components/cartDetail';
import { auth, homepage } from './components/constants';
import Header from './components/header';
import Homepage from './pages/homepage';
import LoginRegister from './pages/loginRegister';
import LogOut from './pages/logout';
import ProductDetail from './pages/productDetail';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("token"))
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <Switch>
        <Route path={auth} exact>

          <LoginRegister setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/products" exact>
          <Homepage />
        </Route>
        <Route path="/orders">
        </Route>

        <Route path="/cart">
          <CartDetail />
        </Route>

        <Route path="/logout">
          <LogOut setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="profile">
        </Route>
        <Route path="/add/" exact>
          <AddProduct />
        </Route>
        <Route
          path={`${homepage}:product_id(\\d+)`}
          exact
          render={({ match, props, location }) => (
            <div>
              <ProductDetail id={match.params.product_id} />
            </div>
          )}
        />

      </Switch>
    </div>

  )
}

export default App;
