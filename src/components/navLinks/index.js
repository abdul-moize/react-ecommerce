import { Link } from "react-router-dom";
import { AUTH } from "../constants";
import "./navLinks.css";
import { isContentManager } from "../utils";

export function NavLinks(props) {
  return (
    <div className="header-right">
      {props.isLoggedIn ? (
        <>
          {isContentManager() && (
            <Link to="/add" className="active" href="">
              Add Product
            </Link>
          )}
          <Link to="/orders"> Orders</Link>
          <Link style={{ padding: "0px" }} to="/cart">
            <img className="cart-image" src="/cart_image.png" alt="Cart" />
          </Link>
          <Link to="/profile"> Profile</Link>
          <Link to="/logout"> Log Out</Link>
        </>
      ) : (
        <Link to={AUTH}>Log In</Link>
      )}
    </div>
  );
}
