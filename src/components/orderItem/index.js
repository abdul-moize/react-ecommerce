import { DOMAIN } from "../../constants";
import styles from "./orderItem.module.css";

export default function OrderItem(props) {
  const order = props.order;
  const cartItems = props.cartItems;
  return (
    <div className={styles["order-item"]}>
      <h2 className={styles["order-number"]}>Order #{order}</h2>
      {cartItems.map((cartItem) => {
        const product = cartItem["product_data"];
        return (
          <div className={styles["order-cart-item"]} key={product.id}>
            <img
              className={styles["order-product-image"]}
              src={
                (product.image && `${DOMAIN}${product.image}`) ||
                "/product_image.png"
              }
              alt={product.name}
            />
            <h5 className={styles["order-product-name"]}>{product.name}</h5>
            <input
              className="order-product-quantity"
              readOnly
              defaultValue={cartItem.quantity}
            />
          </div>
        );
      })}
    </div>
  );
}
