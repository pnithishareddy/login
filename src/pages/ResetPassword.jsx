import { useState } from "react";
import Input from "../components/Input";

function ResetPassword({ goLogin }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const resetPassword = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])\S{8,}$/;

    if (!passwordPattern.test(password)) {
      setError(
        "Password must contain at least 8 characters, one capital letter, one number, one special character, and no spaces"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const savedUser =
      localStorage.getItem("registeredUser");

    if (!savedUser) {
      setError("No registered user found");
      return;
    }

    const user = JSON.parse(savedUser);

    const updatedUser = {
      ...user,
      password: password
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(updatedUser)
    );

    setMessage(
      "Password reset successfully"
    );

    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="logo">
          Auth<span>Dash</span>
        </div>

        <h1>
          Reset Password
        </h1>

        <p className="subtitle">
          Create your new password
        </p>

        <form onSubmit={resetPassword}>

          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter new password"
          />

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            placeholder="Confirm new password"
          />

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {message && (
            <div className="success">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="primary-btn"
          >
            Reset Password
          </button>

        </form>

        <p className="bottom-text">

          Remember your password?

          <button
            type="button"
            className="link-btn"
            onClick={goLogin}
          >
            Login
          </button>

        </p>

      </div>

    </div>
  );
}

export default ResetPassword;