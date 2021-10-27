import { render, screen } from "@testing-library/react";
import CartItem from ".";

const cartItem = {
  product: {
    image: null,
    name: "test product",
    stock_quantity: 10,
    id: 1,
  },
  quantity: 5,
};

test("Should display placeholder image '/product_image.png'", () => {
  render(<CartItem item={cartItem} />);
  const productImageElement = screen.getAllByRole("img")[0];
  expect(productImageElement.getAttribute("src")).toEqual("/product_image.png");
});

test("Should display the product name as 'test product'", () => {
  render(<CartItem item={cartItem} />);
  const productNameElement = screen.getByText("test product");
  expect(productNameElement).toBeInTheDocument();
});

test("Should display the quantity as '5'", () => {
  render(<CartItem item={cartItem} />);
  const quantityElement = screen.getByDisplayValue("5");
  expect(quantityElement).toBeInTheDocument();
});

test("Should display the product id as '1'", () => {
  render(<CartItem item={cartItem} />);
  const quantityElement = screen.getByDisplayValue("1");
  expect(quantityElement).not.toBeVisible();
});
