import { useHistory } from "react-router";
import { useEffect } from "react";
import { AUTH } from "../components/constants";
import { logout } from "../services/userService";

function LogOut(props) {
  const history = useHistory();
  useEffect(() => {
    logout();
    history.replace(AUTH);
    props.setLoggedIn(false);
  }, [history, props]);
  return <></>;
}
export default LogOut;
