import { DOMAIN } from "../../constants";
import "./cartItem.css";

export default function CartItem(props) {
  const cartItem = props.item;
  const product = cartItem.product;
  return (
    <div className="cart-item">
      <img
        className="cart-item-image"
        src={
          (product.image && `${DOMAIN}${product.image}`) || "/product_image.png"
        }
        alt={cartItem.name}
      />
      <div className="cart-item-name">{product.name}</div>
      <input hidden defaultValue={product.id} name="product" />
      <input
        type="number"
        className="quantity-field"
        min="1"
        name="quantity"
        max={product.stock_quantity}
        defaultValue={cartItem.quantity}
        onChange={props.onChangeHandler}
      />
      <button
        type="button"
        className="remove-btn"
        onClick={props.onRemoveHandler}
      >
        <img className="remove-btn-image" src="/trash.png" alt="Remove" />
      </button>
    </div>
  );
}
