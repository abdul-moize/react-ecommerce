import { useRef } from "react";
import { useHistory } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
import CartItem from "../../components/cartItem";
import { ErrorField } from "../../components/elements";
import { HOMEPAGE } from "../../constants";
import {
  getCartItems,
  deleteCartItem,
  updateCart,
  checkoutCart,
} from "../../services/cartService";
import "./cartDetail.css";

export default function CartDetail() {
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("Cart is Empty");
  const formRef = useRef();
  const history = useHistory();
  const updateCartItems = () => {
    getCartItems()
      .then((cartItems) => {
        setCartItems(cartItems);
      })
      .catch((errors) => {
        setCartItems([]);
        setErrorMessage(errors);
      });
  };
  const onChangeHandler = (event) => {
    const formData = new FormData(formRef.current);
    if (event.target.value !== "") {
      updateCart(formData);
    }
  };
  const onRemoveHandler = (id) => {
    deleteCartItem(id).then(() => {
      updateCartItems();
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    checkoutCart(formData)
      .then(() => {
        alert("Order Submitted Successfully");
        history.replace(HOMEPAGE);
      })
      .catch(() =>
        alert("There was a problem submitting the order. Please try again.")
      );
  };

  useEffect(() => {
    updateCartItems();
  }, []);
  return (
    <div className="cart-box">
      {cartItems.length !== 0 ? (
        <>
          <h1 className="title-field">Cart Items</h1>
          <form className="cart-form" ref={formRef} onSubmit={onSubmitHandler}>
            {cartItems.map((item) => {
              return (
                <CartItem
                  item={item}
                  key={item.id}
                  onChangeHandler={onChangeHandler}
                  onRemoveHandler={onRemoveHandler.bind(null, item.id)}
                />
              );
            })}
            <button type="submit" className="checkout-btn">
              Checkout
            </button>
          </form>
        </>
      ) : (
        <ErrorField style={{ fontSize: "25px" }} text={errorMessage} />
      )}
    </div>
  );
}
