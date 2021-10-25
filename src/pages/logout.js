import { useHistory } from "react-router";
import { useContext, useEffect } from "react";
import { AUTH } from "../constants";
import { logout } from "../services/userService";
import { UserContext } from "../store/userContext";

function LogOut() {
  const userContext = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    logout(userContext);
    history.replace(AUTH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

export default LogOut;
