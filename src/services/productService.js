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

export async function addProduct(productData) {
  return fetch(PRODUCT_API, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: productData,
  })
    .then((res) => {
      return res.json().then((data) => [res, data]);
    })
    .then((data) => {
      if (data[0].status === 200) return data[1];
      throw data[1];
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
