import { CART_API } from "../constants";

function OutOfStockException(message) {
  this.message = message;
}

function ServerException(message) {
  this.message = message;
}
export function addToCart(formData) {
  return fetch(CART_API, {
    method: "POST",
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    },
    body: formData,
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      if (res.status === 400)
        throw new OutOfStockException("Product is out of stock");
      if (res.status === 500)
        throw new ServerException("Server error. Please try later");
    })
    .catch((exception) => {
      throw exception.message;
    });
}
