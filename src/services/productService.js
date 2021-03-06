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
  const userToken = localStorage.getItem("userToken");

  return fetch(PRODUCT_API, {
    method: "POST",
    headers: {
      Authorization: `Token ${userToken}`,
    },
    body: productData,
  }).then(async (res) => {
    if (res.status === 201) return res.json();
    throw await res.json();
  });
}

export function getProduct(id) {
  return fetch(`${PRODUCT_API}${id}`)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new DoesNotExistException("Product does not exist");
    })
    .catch((exception) => {
      throw exception.message;
    });
}
