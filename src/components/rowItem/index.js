import { Link } from "react-router-dom";
import { HOMEPAGE } from "../../constants";
import "./rowItem.css";

function RowItem(props) {
  const item = props.item;
  return (
    <Link to={`${HOMEPAGE}${item.id}`} className="product-box">
      <img
        src={item.image || "/product_image.png"}
        className="product-image"
        alt={item.name}
      />
      <div className="name">{item.name.toUpperCase()}</div>
      <div className="price">Rs. {item.price}</div>
    </Link>
  );
}
export default RowItem;
