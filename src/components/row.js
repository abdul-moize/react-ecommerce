import Item from "./item"
import "./row.css"
function Row(props) {
  return (
    <div className="products-box">
      {props.elements.map(element => {
        return <Item item={element} key={element.id} />
      })}
    </div>
  )
}

export default Row
