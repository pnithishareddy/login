
import { useState } from "react";
import Input from "../components/Input";

function Login({ onLogin, goRegister, goForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Demo Account
      if (
        email === "admin@gmail.com" &&
        password === "Admin@123"
      ) {
        const demoUser = {
          name: "Admin",
          email: "admin@gmail.com",
          password: "Admin@123"
        };

        onLogin(demoUser, remember);
        setLoading(false);
        return;
      }

      // Registered User
      const savedUser = localStorage.getItem(
        "registeredUser"
      );

      const registered = savedUser
        ? JSON.parse(savedUser)
        : null;

      if (
        registered &&
        registered.email === email &&
        registered.password === password
      ) {
        onLogin(registered, remember);
      } else {
        setError("Invalid email or password");
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="logo">
          Auth<span>Dash</span>
        </div>

        <h1>Welcome Back</h1>

        <p className="subtitle">
          Login to your dashboard
        </p>

        <form onSubmit={handleLogin}>

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
            placeholder="Enter your password"
          />

          <div className="form-options">

            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) =>
                  setRemember(e.target.checked)
                }
              />

              Remember Me
            </label>

            <button
              type="button"
              className="link-btn"
              onClick={goForgot}
            >
              Forgot Password?
            </button>

          </div>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account?

          <button
            type="button"
            onClick={goRegister}
            className="link-btn"
          >
            Register
          </button>
        </p>

        <div className="demo-account">
          <strong>Demo Account</strong>

          <p>
            Mail: admin@gmail.com
          </p>

          <p>
            Password: Admin@123
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
