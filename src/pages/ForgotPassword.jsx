import { useState } from "react";
import Input from "../components/Input";

function ForgotPassword({ goLogin, goReset }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Enter your email");
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    if (!user || user.email !== email) {
      setError("Email not found");
      return;
    }

    setMessage("Reset link generated successfully");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">Auth<span>Dash</span></div>

        <h1>Forgot Password?</h1>
        <p className="subtitle">
          Enter your registered email
        </p>

        <form onSubmit={submit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          {error && <div className="error">{error}</div>}

          {message && <div className="success">{message}</div>}

          <button className="primary-btn">
            Send Reset Link
          </button>

          {message && (
            <button
              type="button"
              className="secondary-btn"
              onClick={goReset}
            >
              Continue to Reset Password
            </button>
          )}
        </form>

        <button className="link-btn" onClick={goLogin}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;