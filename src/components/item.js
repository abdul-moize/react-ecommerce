import { Link } from "react-router-dom"
import { homepage } from "./constants"

function Item(props) {
  const item = props.item
  return (
    <Link to={`${homepage}${item.id}`} className="item">
      <img src={item.image || "/product_image.png"} width="100%" height="100%" alt={item.name} />
      <div className="name-field">{item.name.toUpperCase()}</div>
      <div className="price-field">{item.price}</div>
    </Link>
  )
}
export default Item
