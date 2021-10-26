import { DOMAIN } from "../../constants";
import styles from "./cartItem.module.css";

export default function CartItem(props) {
  const cartItem = props.item;
  const product = cartItem.product;
  return (
    <div className={styles["cart-item"]}>
      <img
        className={styles["cart-item-image"]}
        src={
          (product.image && `${DOMAIN}${product.image}`) || "/product_image.png"
        }
        alt={cartItem.name}
      />
      <div className={styles["cart-item-name"]}>{product.name}</div>
      <input hidden defaultValue={product.id} name="product" />
      <input
        type="number"
        className={styles["quantity-field"]}
        min="1"
        name="quantity"
        max={product.stock_quantity}
        defaultValue={cartItem.quantity}
        onChange={props.onChangeHandler}
      />
      <button
        type="button"
        className={styles["remove-btn"]}
        onClick={props.onRemoveHandler}
      >
        <img
          className={styles["remove-btn-image"]}
          src="/trash.png"
          alt="Remove"
        />
      </button>
    </div>
  );
}
