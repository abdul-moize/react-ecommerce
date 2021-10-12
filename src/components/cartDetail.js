import { useHistory } from "react-router"
import { useEffect, useState } from "react/cjs/react.development"
import { cartAPI, homepage, productAPI, updateCartAPI } from "./constants"

function CartDetail() {
  const [content, setContent] = useState(<div>Loading...</div>)
  const history = useHistory()
  function updateCart(productId, cartItemId) {
    const form = new FormData(document.getElementById("form"))
    form.set("is_checkout", "False")
    fetch(updateCartAPI, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: form
    }).then(res => {
      if (res.status === 200) {
        alert("cart updated successfully")
      }
    })
      .catch(reason => console.log(reason))
  }
  function deleteItem(id) {
    document.getElementById(id).remove()
    fetch(cartAPI + id, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      },
    }).then(res => res.json())
      .then(data => alert("item removed sucessfully"))
      .catch(reason => alert(reason.toString()))
  }


  useEffect(() => {
    function checkout(e) {
      e.preventDefault()
      const form = new FormData(document.getElementById("form"))
      form.set("is_checkout", "True")
      console.log(form)
      fetch(updateCartAPI, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: form
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
          alert("cart submitted successfully")
          history.replace(homepage)
        }
      })
        .catch(reason => console.log(reason))

    }
    async function getCartItems() {
      const cartData = await fetch(cartAPI, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      }).then(res => res.json())
      if (cartData.status_code === 200) {
        for (let i of cartData.cart_items) {
          i.product = await fetch(`${productAPI}${i.product}`)
            .then(res1 => res1.json())
            .catch(reason => console.log(reason))
        }
        setContent(
          <div className="main-box">
            <form id="form" className="form-box" onSubmit={checkout}>
              <div className="title-field">Cart Items</div>
              {cartData.cart_items.map(value => {
                return (
                  <div className="cart-item" key={`row_${value.id}`} id={value.id}>
                    <img className="cart-item-image" src={value.product.image || "/product_image.png"} alt={value.product.name} />
                    <div className="name-field">{value.product.name}</div>
                    <div className="cart-form" id={value.product.id}>
                      <input hidden name="product" readOnly defaultValue={value.product.id} />
                      <input
                        className="number-field"
                        name="quantity"
                        type="number"
                        onChange={updateCart.bind(null, value.product.id, value.id)}
                        defaultValue={value.quantity}
                        min="1"
                        max={value.product.stock_quantity + value.quantity}
                      />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={deleteItem.bind(null, value.id)}
                      >
                        <img className="remove-btn-image" src="/trash.png" alt="Remove" />
                      </button>
                    </div>
                  </div>
                )
              })}
              <input type="text" name="is_checkout" hidden defaultValue="False" />
              <button type="submit" className="add-to-cart">Checkout</button>
            </form>
          </div>
        )
      }
      else {
        setContent(
          <div className="main-box">Please add items to cart</div>
        )
      }

    }
    getCartItems()
  }, [history])


  return content

}

export default CartDetail
