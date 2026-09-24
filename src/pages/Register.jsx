import { useState } from "react";
import Input from "../components/Input";

function Register({ onRegister, goLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirm) {
      setError("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    onRegister({
      name,
      email,
      password
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">Auth<span>Dash</span></div>

        <h1>Create Account</h1>
        <p className="subtitle">Register your new account</p>

        <form onSubmit={handleRegister}>
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
          />

          <Input
            label="Confirm Password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm password"
          />

          {error && <div className="error">{error}</div>}

          <button className="primary-btn">
            Create Account
          </button>
        </form>

        <p className="bottom-text">
          Already have an account?
          <button onClick={goLogin} className="link-btn">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;