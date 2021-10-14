import { useRef, useState } from "react";
import { registerService } from "../services/userService";
import {
  EmailField,
  NameField,
  PasswordField,
  SubmitButton,
  ErrorField,
} from "./elements";

function RegisterForm(props) {
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const formRef = useRef();
  const register = () => {
    let form = new FormData(formRef.current);
    registerService(form)
      .then((data) => {
        setNameError("");
        setEmailError("");
        setPasswordError([]);
        props.changePage("Account created. Please log in");
      })
      .catch((errors) => {
        setNameError("");
        setEmailError("");
        setPasswordError([]);
        if ("name" in errors) setNameError(errors["name"]);
        if ("email" in errors) setEmailError(errors["email"]);
        if ("password" in errors) setPasswordError(errors["password"]);
      });
  };
  return (
    <form className="input-group" ref={formRef}>
      <NameField />
      {nameError && <ErrorField text={nameError} />}
      <EmailField />
      {emailError && <ErrorField text={emailError} />}
      <PasswordField />
      {passwordError && passwordError.map((v) => <ErrorField text={v} />)}
      <SubmitButton text="Register" onClick={register} />
    </form>
  );
}

export { RegisterForm };
