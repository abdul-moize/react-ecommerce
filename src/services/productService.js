import { PRODUCT_API } from "../constants";

function NoProductsException(message) {
  this.message = message;
}

export default function getProducts() {
  return fetch(PRODUCT_API)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new NoProductsException("No products found");
    })
    .catch((error) => {
      throw error.message;
    });
}
