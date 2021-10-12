import { useHistory } from "react-router";
import { homepage, loginAPI } from "./constants";
import { EmailField, PasswordField, SubmitButton } from "./elements"

function LoginForm(props) {
  const history = useHistory();
  const login = () => {
    let form = new FormData(document.getElementById("login-form"))
    fetch(loginAPI, {
      method: 'POST',
      body: form
    })
      .then(response => response.json())
      .then(data => {
        if (data["status_code"] === 200) {
          localStorage.setItem("token", data["token"])
          localStorage.setItem("role", data["role"])
          props.setLoggedIn(true)
          history.replace(homepage)
        }
        else {
          alert(data["message"])
        }


      }).catch(reason => {
        alert("there was an error in logging in" + reason.toString())
      });


  }
  return (
    <form id="login-form" className="input-group">
      <EmailField />
      <PasswordField />
      <SubmitButton text="Login" onClick={login} />
    </form>
  )
}

export { LoginForm }
