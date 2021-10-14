import { useHistory } from "react-router";
import { useEffect } from "react";
import { AUTH } from "../constants";
import { logout } from "../services/userService";

function LogOut(props) {
  const history = useHistory();
  const setLoggedIn = props.setLoggedIn;
  useEffect(() => {
    logout();
    history.replace(AUTH);
    setLoggedIn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}

export default LogOut;
