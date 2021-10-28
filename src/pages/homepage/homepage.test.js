import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Homepage from ".";

const productService = require("../../services/productService");

const products = [
  { name: "something", id: 1, image: null, price: 1000 },
  { name: "chips", id: 2, image: "", price: 30 },
  { name: "chocolate", id: 3, image: null, price: 50 },
];

const renderHomepage = () => {
  render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );
};

describe("Homepage", () => {
  beforeAll(() => {
    jest.spyOn(productService, "getProducts").mockResolvedValue(products);
  });

  it("Asserts the products rendered are equal to products.length", async () => {
    renderHomepage();
    const productElements = await screen.findAllByRole("link");

    expect(productElements.length).toEqual(products.length);
  });

  it("Asserts first product name to be products[0].name", async () => {
    renderHomepage();
    const productElements = await screen.findAllByRole("link");
    const firstProductNameElement = productElements[0].children[1];

    expect(firstProductNameElement.textContent.toLowerCase()).toEqual(
      products[0].name
    );
  });
});
