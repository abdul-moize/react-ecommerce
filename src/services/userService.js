import { LOGIN_API, USER_API } from "../constants";
import { ServerException } from "./cartService";

function AuthenticationException(message) {
  this.message = message;
}

function NotLoggedInException(message) {
  this.message = message;
}

function InvalidCredentialsException(message) {
  this.message = message;
}

export const loginService = (loginCredential, userContext) => {
  return fetch(LOGIN_API, {
    method: "POST",
    body: loginCredential,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["status_code"] === 200) {
        userContext.setUserContext(data);
        return data;
      }
      throw new AuthenticationException("Wrong email or password");
    })
    .catch((error) => {
      throw error.message;
    });
};

export const registerService = (userData) => {
  return fetch(USER_API, {
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

export const logout = (userContext) => {
  userContext.clearUserContext();
};

export const getUserData = (userToken) => {
  return fetch(USER_API, {
    headers: {
      Authorization: `Token ${userToken}`,
    },
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new NotLoggedInException("You are not logged in");
    })
    .catch((exception) => {
      throw exception.message;
    });
};

export const updateUserData = (userData, userToken) => {
  return fetch(USER_API, {
    method: "PATCH",
    headers: {
      Authorization: `Token ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      if (res.status === 400)
        throw new InvalidCredentialsException("Bad Request");
      throw new ServerException("Server error. Please try again");
    })
    .catch((exception) => {
      throw exception.message;
    });
};
