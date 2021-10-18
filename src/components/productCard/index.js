import { Link } from "react-router-dom";
import { HOMEPAGE } from "../../constants";
import "./productCard.css";

function ProductCard(props) {
  const product = props.product;
  return (
    <Link to={`${HOMEPAGE}${product.id}`} className="product-box">
      <img
        src={product.image || "/product_image.png"}
        className="product-image"
        alt={product.name}
      />
      <div className="name">{product.name.toUpperCase()}</div>
      <div className="price">Rs. {product.price}</div>
    </Link>
  );
}
export default ProductCard;
