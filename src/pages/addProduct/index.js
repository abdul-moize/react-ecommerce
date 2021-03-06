import { useRef, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { ErrorField } from "../../components/elements";
import { HOMEPAGE } from "../../constants";
import { addProduct } from "../../services/productService";
import { UserContext } from "../../store/userContext";
import { isContentManager } from "../../utils";
import "./addProduct.css";

export default function AddProduct() {
  const role = useContext(UserContext).user.role;
  const history = useHistory();
  const [nameError, setNameError] = useState("");
  const formRef = useRef();

  useEffect(() => {
    if (!isContentManager(role)) {
      history.replace(HOMEPAGE);
    }
  }, [history, role]);

  function submitForm(event) {
    event.preventDefault();
    const productData = new FormData(formRef.current);
    addProduct(productData)
      .then((data) => {
        alert("product created.");
      })
      .catch((errors) => {
        setNameError(errors.name[0]);
      });
  }
  return (
    <div
      className="product-form-container"
      style={{ background: "url(/background_banner.jpg)" }}
    >
      <h1 className="title-field">Add Product</h1>
      <form className="product-form" onSubmit={submitForm} ref={formRef}>
        <div className="product-form-row">
          <div className="product-form-field-name">Name:</div>
          <input
            className="input-product-field"
            name="name"
            placeholder="Enter Name"
            required
          />
        </div>
        {nameError && (
          <ErrorField text={nameError} style={{ fontSize: "25px" }} />
        )}
        <div className="product-form-row">
          <div className="product-form-field-name">Quantity:</div>
          <input
            required
            defaultValue="1"
            className="input-product-field"
            name="stock_quantity"
            placeholder="Enter Quantity"
            type="number"
            min="1"
          />
        </div>
        <div className="product-form-row">
          <div className="product-form-field-name">Price:</div>
          <input
            required
            defaultValue="1"
            className="input-product-field"
            name="price"
            placeholder="Enter Price"
            type="number"
            min="1"
          />
        </div>
        <div className="product-form-row">
          <div className="product-form-field-name">Description:</div>
          <textarea
            className="input-product-field"
            name="description"
            placeholder="Enter Description"
          />
        </div>
        <div className="product-form-row">
          <div className="product-form-field-name">Image:</div>
          <input className="file-field" name="image" type="file" />
        </div>
        <button type="submit" className="product-form-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
