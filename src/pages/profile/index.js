import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ErrorField, SubmitButton } from "../../components/elements";
import { AUTH } from "../../constants";
import { getUserData, updateUserData } from "../../services/userService";
import "./profile.css";

function Profile() {
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getUserData()
      .then((userData) => {
        setValues(() => ({
          name: userData.name,
          email: userData.email,
        }));
      })
      .catch((errorMessage) => {
        if (errorMessage === "You are not logged in") history.replace(AUTH);
      });
  }, [history]);

  const setValuesAndErrors = (newValues, newErrors) => {
    setValues(() => newValues);
    setErrors(() => newErrors);
  };
  const onNameChange = (event) => {
    const newName = event.target.value;
    const nameError = newName.trim() === "" && "Name can not be blank";

    setValuesAndErrors(
      { ...values, name: newName },
      { ...errors, name: nameError }
    );
  };

  const onEmailChange = (event) => {
    const emailRegex = /\w*@\w*.com\b/;

    const newEmail = event.target.value;
    const emailError = !emailRegex.test(newEmail) && "Enter a valid email";

    setValuesAndErrors(
      { ...values, email: newEmail },
      { ...errors, email: emailError }
    );
  };

  const onPasswordChange = (event) => {
    const passwordRegex = /[0-9]+[a-zA-z]+\w{6}|[a-zA-Z]+[0-9]+\w{6}/;

    const newPassword = event.target.value;
    const passwordError =
      !passwordRegex.test(newPassword) && "Enter a valid password";

    setValuesAndErrors(
      { ...values, password: newPassword },
      { ...errors, password: passwordError }
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!errors.name && !errors.email && !errors.password) {
      updateUserData(values)
        .then((res) => alert(res.message))
        .catch((exception) => alert(exception));
    }
  };

  return (
    <div className="profile-box">
      <h1 className="profile-title">Profile</h1>
      <form className="profile-form" onSubmit={onSubmit}>
        <label className="profile-form-row" htmlFor="name">
          <h3 className="profile-form-label">Name:</h3>
          <input
            className="profile-form-field"
            name="name"
            onChange={onNameChange}
            placeholder="Enter Name"
            defaultValue={values.name}
          />
        </label>
        {errors.name && (
          <ErrorField style={{ fontSize: "20px" }} text={errors.name} />
        )}
        <label className="profile-form-row" htmlFor="email">
          <h3 className="profile-form-label">Email:</h3>
          <input
            className="profile-form-field"
            name="email"
            onChange={onEmailChange}
            placeholder="Enter Email"
            defaultValue={values.email}
          />
        </label>
        {errors.email && (
          <ErrorField style={{ fontSize: "20px" }} text={errors.email} />
        )}
        <label className="profile-form-row" htmlFor="password">
          <h3 className="profile-form-label">Password:</h3>
          <input
            className="profile-form-field"
            type="password"
            name="password"
            onChange={onPasswordChange}
            placeholder="Enter New Password"
            defaultValue={values.password}
          />
        </label>
        {errors.password && (
          <ErrorField style={{ fontSize: "20px" }} text={errors.password} />
        )}
        <SubmitButton text="Save Changes" />
      </form>
    </div>
  );
}

export default Profile;
