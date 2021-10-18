import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { ErrorField } from "../../components/elements";
import { HOMEPAGE } from "../../constants";
import { addProduct } from "../../services/productService";
import { isContentManager } from "../../utils";
import "./addProduct.css";

export function AddProduct() {
  const history = useHistory();
  const [nameError, setNameError] = useState("");
  const formRef = useRef();
  if (!isContentManager()) {
    history.replace(HOMEPAGE);
  }
  function submitForm(event) {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    addProduct(formData)
      .then((data) => {
        alert("product created.");
      })
      .catch((errorPromise) => {
        errorPromise.then((errors) => {
          if (errors.name) {
            setNameError(errors.name[0]);
          }
        });
      });
  }
  return (
    <div
      className="form-container"
      style={{ background: "url(/background_banner.jpg)" }}
    >
      <div className="title-field">Add Product</div>
      <form className="product-form" onSubmit={submitForm} ref={formRef}>
        <div className="form-row">
          <div className="field-name">Name:</div>
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
        <div className="form-row">
          <div className="field-name">Quantity:</div>
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
        <div className="form-row">
          <div className="field-name">Price:</div>
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
        <div className="form-row">
          <div className="field-name">Description:</div>
          <textarea
            className="input-product-field"
            name="description"
            placeholder="Enter Description"
          />
        </div>
        <div className="form-row">
          <div className="field-name">Image:</div>
          <input className="file-field" name="image" type="file" />
        </div>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
}
