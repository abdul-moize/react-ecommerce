function EmailField(props) {
  return (
    <input
      type="text"
      name="email"
      className="input-field"
      placeholder="Enter Email"
      required
      value={props.email}
      onChange={props.onChange}
    />
  );
}
function NameField() {
  return (
    <input
      type="text"
      name="name"
      className="input-field"
      placeholder="Enter Name"
      required
    />
  );
}
function PasswordField(props) {
  return (
    <input
      type="password"
      name="password"
      className="input-field"
      placeholder="Enter password"
      required
      value={props.password}
      onChange={props.onChange}
    />
  );
}
function SubmitButton(props) {
  return (
    <button
      type={props.onClick ? "button" : "submit"}
      className="submit-btn"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
function ErrorField(props) {
  return (
    <li className="error" style={props.style}>
      {props.text}
    </li>
  );
}

export { NameField, EmailField, PasswordField, SubmitButton, ErrorField };
