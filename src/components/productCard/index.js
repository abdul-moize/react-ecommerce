import { Link } from "react-router-dom";
import { HOMEPAGE } from "../../constants";
import styles from "./productCard.module.css";

function ProductCard(props) {
  const product = props.product;
  return (
    <Link to={`${HOMEPAGE}${product.id}`} className={styles["product-box"]}>
      <img
        src={product.image || "/product_image.png"}
        className={styles["product-image"]}
        alt={product.name}
      />
      <div className={styles["name"]}>{product.name.toUpperCase()}</div>
      <div className={styles["price"]}>Rs. {product.price}</div>
    </Link>
  );
}
export default ProductCard;
