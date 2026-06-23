import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

 const handleLogin = () => {
  const email =
    document.querySelector(
      'input[type="email"]'
    ).value;

  const password =
    document.querySelector(
      'input[type="password"]'
    ).value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

 const savedUser = JSON.parse(
  localStorage.getItem("user")
);

if (
  savedUser &&
  email === savedUser.email &&
  password === savedUser.password
) {
  navigate("/dashboard");
} else {
  alert("Invalid Email or Password");
}
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>

<p className="login-subtitle">
  Welcome back to TaskFlow
</p>

        <input
          type="email"
          placeholder="Enter Email"
        />

        <input
          type="password"
          placeholder="Enter Password"
        />

        <button onClick={handleLogin}>
          Login
        </button>
        
      </div>
    </div>
  );
}

export default Login;