import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = () => {
  const inputs =
    document.querySelectorAll("input");

  const name = inputs[0].value;
  const email = inputs[1].value;
  const password = inputs[2].value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const user = {
  name,
  email,
  password,
};

localStorage.setItem(
  "user",
  JSON.stringify(user)
);
const existingUser = JSON.parse(
  localStorage.getItem("user")
);

if (
  existingUser &&
  existingUser.email === email
) {
  alert(
    "Account already exists. Please login."
  );

  navigate("/login");

  return;

}
alert("Registration Successful");

navigate("/login");
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Register</h1>
        <p className="register-subtitle">
  Join TaskFlow and stay organized
</p>

        <input
          type="text"
          placeholder="Enter Name"
        />

        <input
          type="email"
          placeholder="Enter Email"
        />

        <input
          type="password"
          placeholder="Enter Password"
        />

        <button onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;