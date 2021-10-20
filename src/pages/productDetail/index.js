import { useRef, useEffect, useState } from "react";
import { addToCart } from "../../services/cartService";
import { getProduct } from "../../services/productService";
import "./productDetail.css";

function ProductDetail(props) {
  const id = props.id;
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const formRef = useRef();
  const [errorMessage, setErrorMessage] = useState("Loading...");
  function formSubmit(event) {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    addToCart(formData)
      .then((data) => {
        alert(data.message);
        setQuantity(quantity - formData.get("quantity"));
      })
      .catch((errorMessage) => alert(errorMessage));
  }
  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setProductData(data);
        setQuantity(data.stock_quantity);
      })
      .catch((errors) => setErrorMessage(errors.message));
  }, [id]);
  return (
    <div className="main-box">
      {productData ? (
        <div className="product-container">
          <div className="image-container">
            <img
              className="product-detail-image"
              src={productData.image || "/product_image.png"}
              alt={productData.name}
            />
          </div>
          <div className="product-details">
            <h1 className="title-field">Product Details</h1>
            <div className="description-field">{productData.name}</div>
            <div className="description-field">{productData.description}</div>
            <div className="price-field">Rs. {productData.price}</div>
            {quantity === 0 ? (
              <button className="add-to-cart-btn" disabled>
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
                <button className="add-to-cart-btn" type="submit">
                  Add to cart
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        errorMessage
      )}
    </div>
  );
}

export default ProductDetail;
