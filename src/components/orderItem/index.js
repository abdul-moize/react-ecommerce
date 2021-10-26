import { DOMAIN } from "../../constants";
import "./orderItem.css";

export default function OrderItem(props) {
  const order = props.order;
  const cartItems = props.cartItems;
  return (
    <div className="order-item">
      <h2 className="order-number">Order #{order}</h2>
      {cartItems.map((cartItem) => {
        const product = cartItem["product_data"];
        return (
          <div className="order-cart-item" key={product.id}>
            <img
              className="order-product-image"
              src={
                (product.image && `${DOMAIN}${product.image}`) ||
                "/product_image.png"
              }
              alt={product.name}
            />
            <h5 className="order-product-name">{product.name}</h5>
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
