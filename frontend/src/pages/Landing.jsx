import { Link } from "react-router-dom";

function Landing() {
  return (
  <div className="hero">

    <div className="hero-left">

      <h1 className="landing-title">
        TaskFlow
      </h1>

      <p className="hero-text">
        Manage your tasks smarter with priorities,
        due dates, progress tracking and more.
      </p>

      <div>
        <Link to="/login">
          <button className="landing-btn">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="landing-btn">
            Register
          </button>
        </Link>
      </div>

    </div>

    <div className="hero-right">
      <img
        src="/Task-cuate.png"
        alt="Task Management"
      />
    </div>

  </div>
);
}

export default Landing;