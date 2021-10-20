import { PRODUCT_API } from "../constants";

function NoProductsException(message) {
  this.message = message;
}

function DoesNotExistException(message) {
  this.message = message;
}

export function getProducts() {
  return fetch(PRODUCT_API)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new NoProductsException("No products found");
    })
    .catch((error) => {
      throw error.message;
    });
}

export function addProduct(productData) {
  return fetch(PRODUCT_API, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: productData,
  }).then((res) => {
    if (res.status === 201) return res.json();
    throw res.json();
  });
}

export function getProduct(id) {
  return fetch(`${PRODUCT_API}${id}`).then((res) => {
    if (res.status === 200) return res.json();
    throw new DoesNotExistException("Product does not exist");
  });
}
