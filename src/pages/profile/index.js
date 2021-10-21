import React from "react";
import { withRouter } from "react-router";
import { SubmitButton } from "../../components/elements";
import { AUTH } from "../../constants";
import { getUserData, updateUserData } from "../../services/userService";
import "./profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      nameValid: true,
      emailValid: true,
      passwordValid: true,
    };

    this.formRef = React.createRef();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    const newName = event.target.value;

    this.setState({
      name: newName,
      nameValid: this.state.valid && newName.trim() !== "",
    });
  }

  handleEmailChange(event) {
    const newEmail = event.target.value;
    const emailRegex = /\w*@\w*.com\b/;

    this.setState({
      email: newEmail,
      emailValid: emailRegex.test(newEmail),
    });
  }

  handlePasswordChange(event) {
    const newPassword = event.target.value;
    const passwordRegex = /[0-9]+[a-zA-z]+\w{6}|[a-zA-Z]+[0-9]+\w{6}/;

    this.setState({
      password: newPassword,
      passwordValid: passwordRegex.test(newPassword),
    });
  }

  componentDidMount() {
    getUserData()
      .then((userData) => {
        this.setState({
          name: userData.name,
          email: userData.email,
        });
      })
      .catch((errorMessage) => {
        if (errorMessage === "You are not logged in")
          this.props.history.replace(AUTH);
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.nameValid) alert("Name can not be blank");
    if (!this.state.emailValid) alert("Please enter a valid email");
    if (!this.state.passwordValid) alert("Please enter a valid password");

    if (
      this.state.nameValid &&
      this.state.emailValid &&
      this.state.passwordValid
    ) {
      const userData = new FormData(this.formRef.current);
      if (userData.get("password") === "") userData.delete("password");
      updateUserData(userData)
        .then((res) => alert(res.message))
        .catch((exception) => alert(exception));
    }
  }

  render() {
    return (
      <div className="profile-box">
        <h1 className="profile-title">Profile</h1>
        <form
          className="profile-form"
          ref={this.formRef}
          onSubmit={this.handleSubmit}
        >
          <label className="profile-form-row" htmlFor="name">
            <h3 className="profile-form-label">Name:</h3>
            <input
              className="profile-form-field"
              name="name"
              onChange={this.handleNameChange}
              placeholder="Enter Name"
              defaultValue={this.state.name}
            />
          </label>
          <label className="profile-form-row" htmlFor="email">
            <h3 className="profile-form-label">Email:</h3>
            <input
              className="profile-form-field"
              name="email"
              onChange={this.handleEmailChange}
              placeholder="Enter Email"
              defaultValue={this.state.email}
            />
          </label>
          <label className="profile-form-row" htmlFor="password">
            <h3 className="profile-form-label">Password:</h3>
            <input
              className="profile-form-field"
              type="password"
              name="password"
              onChange={this.handlePasswordChange}
              placeholder="Enter New Password"
              defaultValue={this.state.password}
            />
          </label>
          <SubmitButton text="Save Changes" />
        </form>
      </div>
    );
  }
}

export default withRouter(Profile);
