import { createContext, useState } from "react";

export const UserContext = createContext({
  user: {
    name: "",
    role: "",
    token: "",
  },
  setUserContext: () => {},
  clearUserContext: () => {},
});

export function UserContextProvider(props) {
  const [user, setUser] = useState({
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("userRole") || "",
    token: localStorage.getItem("userToken") || "",
  });

  function setUserContext(userData) {
    setUser({
      name: userData.name,
      role: userData.role,
      token: userData.token,
    });
    localStorage.setItem("userName", userData.name);
    localStorage.setItem("userRole", userData.role);
    localStorage.setItem("userToken", userData.token);
  }

  function clearUserContext() {
    setUser({
      name: "",
      role: "",
      token: "",
    });
  }

  const context = {
    user,
    setUserContext,
    clearUserContext,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}
