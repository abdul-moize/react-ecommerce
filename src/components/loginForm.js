import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { loginService } from "../services/userService";
import { HOMEPAGE } from "./constants";
import {
  EmailField,
  ErrorField,
  PasswordField,
  SubmitButton,
} from "./elements";

function LoginForm(props) {
  const history = useHistory();
  const formRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmitHandler = (event) => {
    event.preventDefault();
    let form = new FormData(formRef.current);
    loginService(form)
      .then((data) => {
        props.setLoggedIn(true);
        history.replace(HOMEPAGE);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };
  return (
    <form
      id="login-form"
      className="input-group"
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      {errorMessage && <ErrorField text={errorMessage} />}
      <EmailField />
      <PasswordField />
      <SubmitButton text="Login" />
    </form>
  );
}

export { LoginForm };
