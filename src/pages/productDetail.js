import { useEffect, useState } from "react/cjs/react.development"
import { cartAPI, productAPI } from "../components/constants"
import "./productDetail.css"

function ProductDetail(props) {
  const id = props.id
  const [content, setContent] = useState(<div>loading...</div>)
  const [quantity, setQuantity] = useState(0)
  function formSubmit(e) {
    e.preventDefault()
    const form = new FormData(document.getElementsByClassName("form")[0])
    fetch(cartAPI, {
      method: "POST",
      headers: {
        Authorization: "Token " + localStorage.getItem("token")
      },
      body: form
    }).then(res => res.json())
      .then(data => {
        setQuantity(form.get("quantity"))
        alert("product added to cart")
      })
  }
  useEffect(
    () => {
      fetch(`${productAPI}${id}`)
        .then(res => res.json())
        .then(data => {
          if ("id" in data) {
            setContent(
              <div className="main-box">
                <div className="product-container">
                  <div className="image-container">
                    <img className="product-image" src={data.image || "/product_image.png"} alt={data.name} />
                  </div>
                  <div className="product-details">
                    <div className="title-field">Product Details</div>
                    <div className="description-field">{data.name}</div>
                    <div className="description-field">{data.description}</div>
                    <div className="price-field">Rs.  {data.price}</div>
                    {quantity === 0 ? <button className="add-to-cart" disabled>Out of Stock</button> :
                      <form className="form" onSubmit={formSubmit}>
                        <input type="number" hidden readOnly value={data.id} name="product" />
                        <input type="number" className="value-field" name="quantity" min="1" max={quantity} defaultValue="1" />
                        <button className="add-to-cart" type="submit">Add to cart</button>
                      </form>
                    }
                  </div>
                </div>
              </div>
            )
            setQuantity(data.stock_quantity)
          }
          else {
            setContent(
              <div className="main-box" style={{ textAlign: 'center' }}>Such A product does not exist</div>
            )
          }
        })
    },
    [id, quantity]
  )
  return (
    content
  )
}

export default ProductDetail
