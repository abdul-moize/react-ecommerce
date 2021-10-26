import { Link } from "react-router-dom";
import { AUTH } from "../../constants";
import styles from "./navLinks.module.css";
import { isContentManager } from "../../utils";
import { useContext } from "react";
import { UserContext } from "../../store/userContext";

export default function NavLinks() {
  const user = useContext(UserContext).user;

  return (
    <div className={styles["header-right"]}>
      {user.name ? (
        <>
          {isContentManager(user.role) && (
            <Link to="/add" className={styles["active"]} href="">
              Add Product
            </Link>
          )}
          <Link to="/orders"> Orders</Link>
          <Link style={{ padding: "0px" }} to="/cart">
            <img
              className={styles["cart-image"]}
              src="/cart_image.png"
              alt="Cart"
            />
          </Link>
          <Link to="/profile">{user.name}</Link>
          <Link to="/logout"> Log Out</Link>
        </>
      ) : (
        <Link to={AUTH}>Log In</Link>
      )}
    </div>
  );
}
