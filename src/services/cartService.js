import { CART_API } from "../constants";

function OutOfStockException(message) {
  this.message = message;
}
export function addToCart(formData) {
  return fetch(CART_API, {
    method: "POST",
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    },
    body: formData,
  }).then((res) => {
    console.log(res);
    if (res.status === 200) return res.json();
    throw new OutOfStockException("Product is out of stock");
  });
}
