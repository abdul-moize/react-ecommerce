import { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { SubmitButton } from "../../components/elements";
import { AUTH } from "../../constants";
import { getUserData, updateUserData } from "../../services/userService";
import "./profile.css";

export function Profile() {
  const history = useHistory();
  const nameRef = useRef();
  const emailRef = useRef();
  const formRef = useRef();
  useEffect(() => {
    getUserData()
      .then((userData) => {
        nameRef.current.value = userData.name;
        emailRef.current.value = userData.email;
      })
      .catch((errorMessage) => {
        if (errorMessage === "You are not logged in") history.replace(AUTH);
      });
  });
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const userData = new FormData(formRef.current);
    if (userData.get("password") === "") userData.delete("password");
    updateUserData(userData)
      .then((res) => alert(res.message))
      .catch((exception) => alert(exception));
  };
  return (
    <div className="profile-box">
      <h1 className="profile-title">Profile</h1>
      <form className="profile-form" ref={formRef} onSubmit={onSubmitHandler}>
        <div className="profile-form-row">
          <h3 className="profile-form-label">Name: </h3>
          <input
            className="profile-form-field"
            name="name"
            placeholder="Enter Name"
            ref={nameRef}
          />
        </div>
        <div className="profile-form-row">
          <h3 className="profile-form-label">Email: </h3>
          <input
            className="profile-form-field"
            name="email"
            placeholder="Enter Email"
            ref={emailRef}
          />
        </div>
        <div className="profile-form-row" hidden>
          <h3 className="profile-form-label">Password: </h3>
          <input
            className="profile-form-field"
            type="password"
            name="password"
            placeholder="Enter New Password"
          />
        </div>
        <SubmitButton text="Save Changes" />
      </form>
    </div>
  );
}
