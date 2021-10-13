import { Link } from "react-router-dom"
import { homepage } from "./constants"
import "./item.css"

function Item(props) {
  const item = props.item
  return (
    <Link to={`${homepage}${item.id}`} className="product-box">
      <img src={item.image || "/product_image.png"} width="250" height="250" alt={item.name} />
      <div className="name">{item.name.toUpperCase()}</div>
      <div className="price">Rs. {item.price}</div>
    </Link>
  )
}
export default Item
