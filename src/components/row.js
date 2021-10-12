import Item from "./item"

function Row(props) {
  return (
    <div className="row">
      {props.elements.map(element => {
        return <Item item={element} key={element.id} />
      })}
    </div>
  )
}

export default Row
