import { CART_API, UPDATE_CART_API } from "../constants";

function OutOfStockException(message) {
  this.message = message;
}

export function ServerException(message) {
  this.message = message;
}

function NoCartItemsException(message) {
  this.message = message;
}

function NoOrdersException(message) {
  this.message = message;
}

export function getCartItems() {
  const userToken = localStorage.getItem("userToken");
  return fetch(CART_API, {
    headers: {
      Authorization: `Token ${userToken}`,
    },
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new NoCartItemsException("Cart is Empty. Please add items to cart");
    })
    .then((data) => {
      if (data["cart_items"].length > 0) return data["cart_items"];
      throw new NoCartItemsException("Cart is Empty. Please add items to cart");
    })
    .catch((errors) => {
      throw errors.message;
    });
}

export function deleteCartItem(id) {
  const userToken = localStorage.getItem("userToken");

  return fetch(`${CART_API}${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${userToken}`,
    },
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new NoCartItemsException("Invalid Id");
    })
    .catch((reason) => alert(reason));
}

export function updateCart(formData, checkout = "False") {
  const userToken = localStorage.getItem("userToken");

  formData.set("is_checkout", checkout);
  return fetch(UPDATE_CART_API, {
    method: "POST",
    headers: {
      Authorization: `Token ${userToken}`,
    },
    body: formData,
  })
    .then((res) => {
      if (res.status === 200) return res;
      throw new NoCartItemsException("error");
    })
    .catch((reason) => {
      throw reason.message;
    });
}

export function addToCart(formData) {
  const userToken = localStorage.getItem("userToken");

  return fetch(CART_API, {
    method: "POST",
    headers: {
      Authorization: `Token ${userToken}`,
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

export function checkoutCart(formData) {
  const userToken = localStorage.getItem("userToken");

  return updateCart(formData, userToken, "True");
}

export function getOrders() {
  const userToken = localStorage.getItem("userToken");

  return fetch(CART_API, {
    headers: {
      Authorization: `Token ${userToken}`,
    },
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new NoOrdersException("Please submit an order first");
    })
    .then((data) => data["orders"])
    .catch((exception) => {
      throw exception.message;
    });
}
