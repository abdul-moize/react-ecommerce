import RowItem from "../rowItem";
import "./productRow.css";

function ProductRow(props) {
  return (
    <div className="products-box">
      {props.elements.map((element) => {
        return <RowItem item={element} key={element.id} />;
      })}
    </div>
  );
}

export default ProductRow;
