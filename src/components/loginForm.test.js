import { screen, render, fireEvent } from "@testing-library/react";
import React from "react";
import LoginForm from "./loginForm";

const userService = require("../services/userService");

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

describe("LoginForm", () => {
  it("Should log a user in", () => {
    render(<LoginForm />);

    const loginService = jest.spyOn(userService, "loginService");
    const [emailField, passwordField] = screen.getAllByPlaceholderText(
      /enter (email|password)/i
    );
    fireEvent.change(emailField, { target: { value: user.email } });
    fireEvent.change(passwordField, { target: { value: user.password } });

    const loginButton = screen.getByRole("button");
    fireEvent.click(loginButton);

    const userData = new FormData();
    userData.append("email", user.email);
    userData.append("password", user.password);

    expect(loginService).toBeCalledWith(userData);

    loginService.mockReset();
    loginService.mockRestore();
  });

  it("should not log in a user", () => {
    render(<LoginForm />);

    const loginService = jest.spyOn(userService, "loginService");
    const [emailField, passwordField] = screen.getAllByPlaceholderText(
      /enter (email|password)/i
    );
    fireEvent.change(emailField, { target: { value: "asd" } });
    fireEvent.change(passwordField, { target: { value: user.password } });

    const loginButton = screen.getByRole("button");
    fireEvent.click(loginButton);

    const userData = new FormData();
    userData.append("email", "asd");
    userData.append("password", user.password);

    expect(loginService).toBeCalledWith(userData);

    loginService.mockReset();
    loginService.mockRestore();
  });
});
