import { Link } from "react-router-dom";
import { HOMEPAGE } from "../../constants";
import { NavLinks } from "../navLinks";
import "./header.css";

function Header(props) {
  return (
    <header className="header">
      <Link to={HOMEPAGE} className="logo">
        Django-Ecommerce
      </Link>
      <NavLinks isLoggedIn={props.isLoggedIn} />
    </header>
  );
}

export default Header;
