import { useState } from "react";
import LoginForm from "../../components/loginForm";
import RegisterForm from "../../components/registerForm";
import "./loginOrRegister.css";

function LoginOrRegister() {
  const [activeForm, setActiveForm] = useState("login");
  const [message, setMessage] = useState("");

  let showLoginForm = () => {
    setActiveForm("login");
  };

  let showRegisterForm = () => {
    setActiveForm("register");
    setMessage("");
  };

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
        {activeForm === "login" ? (
          <LoginForm />
        ) : (
          <RegisterForm changePage={showLoginForm} setMessage={setMessage} />
        )}
      </div>
    </div>
  );
}

export default LoginOrRegister;
