import { useRef } from "react";
import { Link } from "react-router-dom";
import { auth, homepage } from "./constants";
import { isContentManager } from "./utils";

function Header(props) {
  const bubble = useRef()
  let content = (<Link to={auth}>Log In</Link>)
  const isLoggedIn = props.isLoggedIn
  const added = localStorage.getItem("added")
  if (isLoggedIn) {
    content = (
      <div>
        {isContentManager() ? <Link to="/add" className="active" href="">Add Product</Link> : null}
        <Link to="/orders"> Orders</Link>
        <Link style={{ padding: "0px" }} to="/cart"> <img className="cart-image" src="/cart_image.png" alt="Cart" /></Link>
        {added ? <div id="message" ref={bubble} className="bubble bubble-top-right">Product added to cart</div> : null}
        <Link to="/profile"> Profile</Link>
        <Link to="/logout"> Log Out</Link >
      </div>
    )
    setTimeout(() => {
      if (bubble.current)
        bubble.current.hidden = true
    }, 2000)
  }

  return (
    <header className="header">
      <Link to={homepage} className="logo">Django-Ecommerce</Link>
      <div className="header-right">
        {content}
      </div >
    </header >
  )
}

export default Header
