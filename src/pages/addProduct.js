import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"
import { productAPI } from "../components/constants"
import { ErrorField } from "../components/elements"
import { isContentManager } from "../components/utils"
import "./addProduct.css"

export function AddProduct() {
  const history = useHistory()
  let error = false
  const [nameError, setNameError] = useState("")
  if (!isContentManager()) {
    history.replace("/products")
  }
  function submitForm(event) {
    event.preventDefault()
    const form = new FormData(document.getElementById("form"))
    fetch(productAPI, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: form
    }).then(res => {
      if (res.status === 201) {
        alert("Product created successfully")
        setNameError("")
      }
      else {
        error = true
        alert("There was an error in creating a product. Please try again")
      }
      return res.json()
    })
      .then(data => {
        if (error && data.name) {
          setNameError(data.name[0])
        }
      })
      .catch(reason => console.log(reason))
  }
  return (
    <div className="form-container" style={{ background: "url(/background_banner.jpg)" }}>
      <div className="title-field">Add Product</div>
      <form className="product-form" onSubmit={submitForm} id="form">
        <div className="form-row">
          <div className="field-name" >Name:</div>
          <input className="input-product-field" name="name" placeholder="Enter Name" required />
        </div>
        {nameError && <ErrorField text={nameError} style={{ fontSize: '25px' }}/>}
        <div className="form-row">
          <div className="field-name" >Quantity:</div>
          <input required defaultValue="1" className="input-product-field" name="stock_quantity" placeholder="Enter Quantity" type="number" min="1" />

        </div>
        <div className="form-row">
          <div className="field-name" >Price:</div>
          <input required defaultValue="1" className="input-product-field" name="price" placeholder="Enter Price" type="number" min="1" />

        </div>
        <div className="form-row">
          <div className="field-name" >Description:</div>
          <textarea className="input-product-field" name="description" placeholder="Enter Description" />

        </div>
        <div className="form-row">
          <div className="field-name" >Image:</div>
          <input className="file-field" name="image" type="file" />
        </div>
        <button type="submit" className="button">Submit</button>

      </form>
    </div>
  )
}
