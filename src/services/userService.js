import { LOGIN_API, REGISTER_API } from "../constants";

function AuthenticationException(message) {
  this.message = message;
}

export const loginService = (loginCredential) => {
  return fetch(LOGIN_API, {
    method: "POST",
    body: loginCredential,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["status_code"] === 200) {
        localStorage.setItem("token", data["token"]);
        localStorage.setItem("role", data["role"]);
        return data;
      }
      throw new AuthenticationException("Wrong email or password");
    })
    .catch((error) => {
      throw error.message;
    });
};

export const registerService = (userData) => {
  return fetch(REGISTER_API, {
    method: "POST",
    body: userData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["status_code"] === 201) {
        return data;
      }
      throw data;
    })
    .catch((error) => {
      throw error.message;
    });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
