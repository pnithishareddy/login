import { useState } from "react";

function Input({ label, type = "text", value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  const password = type === "password";

  return (
    <div className="input-group">
      <label>{label}</label>

      <div className="password-box">
        <input
          type={password && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />

        {password && (
          <button
            type="button"
            className="show-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;