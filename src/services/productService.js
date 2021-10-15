import { PRODUCT_API } from "../constants";

function NoProductsException(message) {
  this.message = message;
}

export default function getProducts() {
  return fetch(PRODUCT_API)
    .then((res) => {
      console.log(res);
      if (res.status === 200) return res.json();
      throw new NoProductsException("No products found");
    })
    .then((products) => {
      const newData = [];
      let row = [];

      for (let i = 0; i < products.length; i++) {
        row.push(products[i]);
        if ((i + 1) % 5 === 0 || i === products.length - 1) {
          newData.push(row);
          row = [];
        }
      }
      return newData;
    })
    .catch((error) => {
      throw error.message;
    });
}
