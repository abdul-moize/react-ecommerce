import { LOGIN_API, REGISTER_API } from "../components/constants";

function AuthenticationException(message) {
  this.message = message;
}

export const loginService = (form) => {
  return fetch(LOGIN_API, {
    method: "POST",
    body: form,
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

export const registerService = (form) => {
  return fetch(REGISTER_API, {
    method: "POST",
    body: form,
  }).then((response) => response.json());
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
