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
    const savedUser = localStorage.getItem("loggedUser");

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

  /* GET DEVICE */

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;

    let device = "Computer";
    let icon = "💻";

    if (/Android/i.test(ua)) {
      device = "Android Phone";
      icon = "📱";
    } else if (/iPhone/i.test(ua)) {
      device = "iPhone";
      icon = "🍎";
    } else if (/iPad/i.test(ua)) {
      device = "iPad";
      icon = "📱";
    } else if (/Macintosh|Mac OS X/i.test(ua)) {
      device = "Mac";
      icon = "🍎";
    } else if (/Windows/i.test(ua)) {
      device = "Windows PC";
      icon = "💻";
    } else if (/Linux/i.test(ua)) {
      device = "Linux PC";
      icon = "💻";
    }

    /* GET BROWSER */

    let browser = "Browser";

    if (/Edg/i.test(ua)) {
      browser = "Microsoft Edge";
    } else if (/OPR|Opera/i.test(ua)) {
      browser = "Opera";
    } else if (/Chrome/i.test(ua)) {
      browser = "Google Chrome";
    } else if (/Firefox/i.test(ua)) {
      browser = "Mozilla Firefox";
    } else if (/Safari/i.test(ua)) {
      browser = "Safari";
    }

    return {
      device,
      icon,
      browser
    };
  };

  /* LOGIN */

  const login = (userData, remember) => {

    setUser(userData);

    /* CREATE LOGIN ACTIVITY */

    const deviceInfo = getDeviceInfo();

    const newActivity = {
      email: userData.email,
      device: deviceInfo.device,
      icon: deviceInfo.icon,
      browser: deviceInfo.browser,
      time: new Date().toISOString()
    };

    const oldActivities =
      JSON.parse(localStorage.getItem("loginActivities")) || [];

    const updatedActivities = [
      newActivity,
      ...oldActivities
    ];

    /* KEEP ONLY LAST 20 LOGINS */

    localStorage.setItem(
      "loginActivities",
      JSON.stringify(updatedActivities.slice(0, 20))
    );

    if (remember) {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(userData)
      );
    }

    setPage("dashboard");

    showToast("Login successful!");
  };

  /* LOGOUT */

  const logout = () => {
    localStorage.removeItem("loggedUser");

    setUser(null);
    setPage("login");

    showToast("Logged out successfully");
  };

  /* REGISTER */

  const register = (userData) => {

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(userData)
    );

    setPage("login");

    showToast("Registration successful!");
  };

  /* UPDATE USER */

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

    showToast("Profile updated successfully!");
  };

  return (
    <>
      {page === "login" && (
        <Login
          onLogin={login}
          goRegister={() => setPage("register")}
          goForgot={() => setPage("forgot")}
        />
      )}

      {page === "register" && (
        <Register
          onRegister={register}
          goLogin={() => setPage("login")}
        />
      )}

      {page === "forgot" && (
        <ForgotPassword
          goLogin={() => setPage("login")}
          goReset={() => setPage("reset")}
        />
      )}

      {page === "reset" && (
        <ResetPassword
          goLogin={() => setPage("login")}
        />
      )}

      {page === "dashboard" && user && (
        <Dashboard
          user={user}
          goProfile={() => setPage("profile")}
          goSettings={() => setPage("settings")}
          logout={logout}
        />
      )}

      {page === "profile" && user && (
        <Profile
          user={user}
          updateUser={updateUser}
          goDashboard={() => setPage("dashboard")}
          logout={logout}
        />
      )}

      {page === "settings" && user && (
        <Settings
          user={user}
          goDashboard={() => setPage("dashboard")}
          goProfile={() => setPage("profile")}
          logout={logout}
        />
      )}

      <Toast message={toast} />
    </>
  );
}

export default App;