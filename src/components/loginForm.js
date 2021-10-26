import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import { loginService } from "../services/userService";
import { HOMEPAGE } from "../constants";
import {
  EmailField,
  ErrorField,
  PasswordField,
  SubmitButton,
} from "./elements";
import { UserContext } from "../store/userContext";

function LoginForm() {
  const userContext = useContext(UserContext);
  console.log(userContext);
  const history = useHistory();

  const formRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let formData = new FormData(formRef.current);

    loginService(formData)
      .then((data) => {
        userContext.setUserContext(data);
        history.replace(HOMEPAGE);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  return (
    <form className="input-group" onSubmit={onSubmitHandler} ref={formRef}>
      {errorMessage && <ErrorField text={errorMessage} />}
      <EmailField />
      <PasswordField />
      <SubmitButton text="Login" />
    </form>
  );
}

export default LoginForm;
