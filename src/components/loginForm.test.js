import { screen, render, fireEvent, act } from "@testing-library/react";
import React from "react";
import { HOMEPAGE } from "../constants";
import LoginForm from "./loginForm";

const userService = require("../services/userService");

let loginService;

let user = {
  email: "admin@admin.com",
  password: "adminpassword",
  name: "Admin",
  role: "SA",
};

const mockReplace = jest.fn();

jest.mock("react-router", () => ({
  useHistory: () => ({
    replace: mockReplace,
  }),
}));

describe("LoginForm", () => {
  beforeAll(() => {
    loginService = jest
      .spyOn(userService, "loginService")
      .mockImplementation((userData) => {
        if (
          userData.get("email") === user.email &&
          userData.get("password") === user.password
        )
          return Promise.resolve({
            message: "Logged in sucessfully",
          });
        return Promise.reject("Wrong email or password");
      });
    mockReplace.mockClear();
  });

  afterAll(() => {
    loginService.mockReset();
    loginService.mockRestore();
  });

  it("Should log a user in", async () => {
    render(<LoginForm />);

    const [emailField, passwordField] = screen.getAllByPlaceholderText(
      /enter (email|password)/i
    );
    fireEvent.change(emailField, { target: { value: user.email } });
    fireEvent.change(passwordField, { target: { value: user.password } });

    const loginButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(loginButton);
    });

    const userData = new FormData();
    userData.append("email", user.email);
    userData.append("password", user.password);

    expect(loginService).toBeCalledWith(userData);
    expect(mockReplace).toBeCalledWith(HOMEPAGE);
  });

  it("should not log in a user", async () => {
    render(<LoginForm />);

    const [emailField, passwordField] = screen.getAllByPlaceholderText(
      /enter (email|password)/i
    );
    fireEvent.change(emailField, { target: { value: "asd" } });
    fireEvent.change(passwordField, { target: { value: user.password } });

    const loginButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(loginButton);
    });

    const userData = new FormData();
    userData.append("email", "asd");
    userData.append("password", user.password);

    expect(loginService).toBeCalledWith(userData);
    expect(screen.getByText("Wrong email or password")).toBeInTheDocument();
  });
});
