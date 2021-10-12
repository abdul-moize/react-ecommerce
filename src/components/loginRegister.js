import { useState } from "react"
import { LoginForm } from "./loginForm"
import { RegisterForm } from "./registerForm"

function LoginRegister(props) {
  const loginForm = <LoginForm setLoggedIn={props.setLoggedIn} />
  const [form, setForm] = useState(loginForm)
  const [button, setButton] = useState('0px')
  const [message, setMessage] = useState("")
  let showLoginForm = (m = "") => {
    setForm(loginForm)
    setButton('0px')
    if (typeof (m) === "string")
      setMessage(m)
  }
  const registerForm = <RegisterForm changePage={showLoginForm} />
  let showRegisterForm = () => {

    setForm(registerForm)
    setButton('110px')
    setMessage("")
  }

  return (
    <div className="hero" style={{ background: "url(/banner.jpg)" }} >
      <div className="form-box">
        <div className="button-box">
          <div id="btn" style={{ left: button }}></div>
          <button className="toggle-btn" onClick={showLoginForm}>Log In</button>
          <button className="toggle-btn" onClick={showRegisterForm}>Register</button>
        </div>
        {message ? <div className="message">{message}</div> : null}
        {form}
      </div>
    </div>
  );
}

export default LoginRegister
