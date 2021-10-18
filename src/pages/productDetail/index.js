import { useRef, useEffect, useState } from "react";
import { addToCart } from "../../services/cartService";
import { getProduct } from "../../services/productService";
import "./productDetail.css";

function ProductDetail(props) {
  const id = props.id;
  const [content, setContent] = useState(<div>loading...</div>);
  const [quantity, setQuantity] = useState(0);
  const formRef = useRef();
  function formSubmit(event) {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    addToCart(formData)
      .then((data) => {
        console.log(data);
        setQuantity(formData.get("quantity"));
        alert(data.message);
      })
      .catch((errorMessage) => alert(errorMessage));
  }
  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setContent(
          <div className="main-box">
            <div className="product-container">
              <div className="image-container">
                <img
                  className="product-detail-image"
                  src={data.image || "/product_image.png"}
                  alt={data.name}
                />
              </div>
              <div className="product-details">
                <div className="title-field">Product Details</div>
                <div className="description-field">{data.name}</div>
                <div className="description-field">{data.description}</div>
                <div className="price-field">Rs. {data.price}</div>
                {quantity === 0 ? (
                  <button className="add-to-cart" disabled>
                    Out of Stock
                  </button>
                ) : (
                  <form className="form" onSubmit={formSubmit} ref={formRef}>
                    <input type="hidden" defaultValue={id} name="product" />
                    <input
                      type="number"
                      className="value-field"
                      name="quantity"
                      min="1"
                      max={quantity}
                      defaultValue="1"
                    />
                    <button className="add-to-cart" type="submit">
                      Add to cart
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        );
        setQuantity(data.stock_quantity);
      })
      .catch(() => {
        setContent(
          <div className="main-box" style={{ textAlign: "center" }}>
            Such A product does not exist
          </div>
        );
      });
  }, [id, quantity]);
  return content;
}

export default ProductDetail;
