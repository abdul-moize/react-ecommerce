import { Link } from "react-router-dom";
import { HOMEPAGE } from "../../constants";
import NavLinks from "../navLinks";
import styles from "./header.module.css";

function Header(props) {
  return (
    <header className={styles["header"]}>
      <Link to={HOMEPAGE} className={styles["logo"]}>
        Django-Ecommerce
      </Link>
      <NavLinks />
    </header>
  );
}

export default Header;
