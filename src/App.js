import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import Toast from "./components/Toast";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const savedUser =
      localStorage.getItem("loggedUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setPage("dashboard");
    }
  }, []);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };


  // Login

  const login = (userData, remember) => {
    setUser(userData);

    if (remember) {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(userData)
      );
    }

    setPage("dashboard");

    showToast("Login successful!");
  };


  // Logout

  const logout = () => {
    localStorage.removeItem("loggedUser");

    setUser(null);

    setPage("login");

    showToast(
      "Logged out successfully"
    );
  };


  // Register

  const register = (userData) => {
    localStorage.setItem(
      "registeredUser",
      JSON.stringify(userData)
    );

    setPage("login");

    showToast(
      "Registration successful!"
    );
  };


  // Update Profile

  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    localStorage.setItem(
      "loggedUser",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(updatedUser)
    );

    showToast(
      "Profile updated successfully!"
    );
  };


  return (
    <>

      {/* Login */}

      {page === "login" && (
        <Login
          onLogin={login}
          goRegister={() =>
            setPage("register")
          }
          goForgot={() =>
            setPage("forgot")
          }
        />
      )}


      {/* Register */}

      {page === "register" && (
        <Register
          onRegister={register}
          goLogin={() =>
            setPage("login")
          }
        />
      )}


      {/* Forgot Password */}

      {page === "forgot" && (
        <ForgotPassword
          goLogin={() =>
            setPage("login")
          }
          goReset={() =>
            setPage("reset")
          }
        />
      )}


      {/* Reset Password */}

      {page === "reset" && (
        <ResetPassword
          goLogin={() =>
            setPage("login")
          }
        />
      )}


      {/* Dashboard */}

      {page === "dashboard" && user && (
        <Dashboard
          user={user}
          goProfile={() =>
            setPage("profile")
          }
          goSettings={() =>
            setPage("settings")
          }
          logout={logout}
        />
      )}


      {/* Profile */}

      {page === "profile" && user && (
        <Profile
          user={user}
          updateUser={updateUser}
          goDashboard={() =>
            setPage("dashboard")
          }
          logout={logout}
        />
      )}


      {/* Settings */}

      {page === "settings" && user && (
        <Settings
          user={user}
          goDashboard={() =>
            setPage("dashboard")
          }
          goProfile={() =>
            setPage("profile")
          }
          logout={logout}
        />
      )}


      {/* Toast */}

      <Toast message={toast} />

    </>
  );
}

export default App;