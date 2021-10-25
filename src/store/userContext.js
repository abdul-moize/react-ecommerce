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
    name: sessionStorage.getItem("userName") || "",
    role: sessionStorage.getItem("userRole") || "",
    token: sessionStorage.getItem("userToken") || "",
  });

  function setUserContext(userData) {
    setUser({
      name: userData.name,
      role: userData.role,
      token: userData.token,
    });
    sessionStorage.setItem("userName", userData.name);
    sessionStorage.setItem("userRole", userData.role);
    sessionStorage.setItem("userToken", userData.token);
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
