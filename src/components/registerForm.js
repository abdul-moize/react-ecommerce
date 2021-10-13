import { useState } from "react/cjs/react.development";
import { registerAPI } from "./constants";
import { EmailField, NameField, PasswordField, SubmitButton, ErrorField } from "./elements"

function RegisterForm(props) {
  const [nameError, setNameError] = useState()
  const [emailError, setEmailError] = useState()
  const [passwordError, setPasswordError] = useState();
  const register = () => {
    let form = new FormData(document.getElementById("register-form"))
    fetch(registerAPI, {
      method: 'POST',
      body: form
    })
      .then(response => response.json())
      .then(data => {
        setNameError("")
        setEmailError("")
        setPasswordError([])
        if (data["status_code"] === 201) {
          props.changePage("Account created. Please log in")
        }
        else {
          let errors = data["message"]
          if ("name" in errors)
            setNameError(errors["name"])
          if ("email" in errors)
            setEmailError(errors["email"])
          if ("password" in errors)
            setPasswordError(errors["password"])

        }
      });
  }
  return (
    <form id="register-form" className="input-group">
      <NameField />
      {nameError ? <ErrorField text={nameError} /> : null}
      <EmailField />
      {emailError ? <ErrorField text={emailError} /> : null}
      <PasswordField />
      {passwordError ? passwordError.map(v => <ErrorField text={v} />) : null}
      <SubmitButton text="Register" onClick={register} />
    </form>
  )
}

export { RegisterForm }
