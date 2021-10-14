import { useState } from "react";
import "./loginOrRegister.css";
import { LoginForm } from "../components/loginForm";
import { RegisterForm } from "../components/registerForm";

function LoginOrRegister(props) {
  const [activeForm, setActiveForm] = useState("login");
  const [message, setMessage] = useState("");

  let showLoginForm = (m = "") => {
    setActiveForm("login");
    if (typeof m === "string") setMessage(m);
  };

  let showRegisterForm = () => {
    setActiveForm("register");
    setMessage("");
  };
  const loginForm = <LoginForm setLoggedIn={props.setLoggedIn} />;
  const registerForm = <RegisterForm changePage={showLoginForm} />;

  return (
    <div className="hero" style={{ background: "url(/background_banner.jpg)" }}>
      <div className="form-box">
        <div className="button-box">
          <div
            className={`btn ${
              activeForm === "login" ? "active-login" : "active-register"
            }`}
          />
          <button className="toggle-btn" onClick={showLoginForm}>
            Log In
          </button>
          <button className="toggle-btn" onClick={showRegisterForm}>
            Register
          </button>
        </div>
        {message && <div className="message">{message}</div>}
        {activeForm === "login" ? loginForm : registerForm}
      </div>
    </div>
  );
}

export default LoginOrRegister;
