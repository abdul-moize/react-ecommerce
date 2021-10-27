import { screen, render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import App from "../App";
import LoginForm from "./loginForm";
let user = {
  email: "admin@admin.com",
  password: "adminpassword",
  name: "Admin",
  role: "SA",
};

jest.mock("react-router", () => ({
  useHistory: () => ({
    replace: jest.fn(),
  }),
}));

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation((apiLink, options) => {
    const email = options.body.get("email");
    const password = options.body.get("password");
    let validCredentials = false;
    if (email === user.email && password === user.password)
      validCredentials = true;
    return new Promise((resolve, reject) => {
      if (validCredentials) {
        resolve({
          status: 200,
          json: jest.fn().mockResolvedValue({
            role: user.role,
            email: user.email,
            name: user.name,
          }),
        });
      }
      resolve({
        status: 400,
        json: jest.fn().mockResolvedValue({
          message: "Wrong email or password",
        }),
      });
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("Should log a user in", async () => {
  act(() => {
    render(<LoginForm />);
  });
  const [emailField, passwordField] = screen.getAllByPlaceholderText(
    /enter (email|password)/i
  );
  fireEvent.change(emailField, { target: { value: user.email } });
  fireEvent.change(passwordField, { target: { value: user.password } });
  const loginButton = screen.getByRole("button");
  fireEvent.click(loginButton);
  const errorElement = screen.queryByText("Wrong email or password");
  expect(errorElement).not.toBeInTheDocument();
});
