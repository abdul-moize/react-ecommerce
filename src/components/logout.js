import { useHistory } from "react-router"
import { useEffect } from "react/cjs/react.development"
import { auth } from "./constants"

function LogOut(props) {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
  const history = useHistory()
  useEffect(() => {
    history.replace(auth)
    props.setLoggedIn(false)
  }, [history, props])

  return (<div></div>)
}
export default LogOut
