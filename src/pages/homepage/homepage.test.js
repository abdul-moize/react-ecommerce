import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Homepage from ".";

const products = [
  { name: "something", id: 1, image: null, price: 1000 },
  { name: "chips", id: 2, image: "", price: 30 },
  { name: "chocolate", id: 3, image: null, price: 50 },
];

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    status: 200,
    json: jest.fn().mockResolvedValue(products),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

const mockHomepage = () => {
  render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );
};

test("Asserts the products rendered are equal to products.length", async () => {
  mockHomepage();
  const productElements = await screen.findAllByRole("link");

  expect(productElements.length).toEqual(products.length);
});

test("Asserts first product name to be products[0].name", async () => {
  mockHomepage();
  const productElements = await screen.findAllByRole("link");
  const firstProductNameElement = productElements[0].children[1];

  expect(firstProductNameElement.textContent.toLowerCase()).toEqual(
    products[0].name
  );
});
