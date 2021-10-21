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
    let formData = new FormData(formRef.current);

    registerService(formData)
      .then((data) => {
        setNameError("");
        setEmailError("");
        setPasswordError([]);
        props.setMessage("Account created. Please log in");
        props.changePage();
      })
      .catch((errors) => {
        setNameError("name" in errors ? errors["name"] : "");
        setEmailError("email" in errors ? errors["email"] : "");
        setPasswordError("password" in errors ? errors["password"] : []);
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

export default RegisterForm;
