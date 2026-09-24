import { useEffect, useState } from "react";
import Input from "../components/Input";

function Profile({
  user,
  updateUser,
  goDashboard,
  logout
}) {

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [activities, setActivities] = useState([]);

  /* LOAD LOGIN ACTIVITY */

  useEffect(() => {

    const savedActivities =
      JSON.parse(localStorage.getItem("loginActivities")) || [];

    const userActivities = savedActivities.filter(
      (item) => item.email === user.email
    );

    setActivities(userActivities);

  }, [user.email]);

  /* FORMAT DATE AND TIME */

  const formatDateTime = (time) => {

    const date = new Date(time);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  /* UPDATE PROFILE */

  const updateProfile = (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    if (!name || !email) {
      setError("Name and email are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    const updatedUser = {
      ...user,
      name: name,
      email: email
    };

    updateUser(updatedUser);

    setMessage("Profile updated successfully");
  };

  /* CHANGE PASSWORD */

  const changePassword = (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !oldPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError("Please fill all password fields");
      return;
    }

    if (oldPassword !== user.password) {
      setError("Current password is incorrect");
      return;
    }

    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])\S{8,}$/;

    if (!passwordPattern.test(newPassword)) {

      setError(
        "Password must contain at least 8 characters, one capital letter, one number, one special character, and no spaces"
      );

      return;
    }

    if (newPassword !== confirmPassword) {

      setError("New passwords do not match");

      return;
    }

    const updatedUser = {
      ...user,
      name: name,
      email: email,
      password: newPassword
    };

    updateUser(updatedUser);

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(updatedUser)
    );

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setMessage("Password changed successfully");
  };

  return (
    <div className="profile-page">

      {/* HEADER */}

      <div className="profile-header">

        <button
          onClick={goDashboard}
          className="back-btn"
        >
          ← Dashboard
        </button>

        <button
          onClick={logout}
          className="logout-small"
        >
          Logout
        </button>

      </div>

      <div className="profile-container">

        {/* LEFT SIDE */}

        <div>

          {/* PROFILE CARD */}

          <div className="profile-card profile-main-card">

            <div className="avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h1>{user.name}</h1>

            <p>{user.email}</p>

            <span className="status">
              Active
            </span>

          </div>

          {/* REAL LOGIN ACTIVITY */}

          <div className="profile-card recent-activity">

            <h2>🕒 Recent Login Activity</h2>

            {activities.length > 0 ? (

              activities.map((activity, index) => (

                <div
                  className="profile-activity"
                  key={index}
                >

                  <span className="activity-icon">
                    {activity.icon}
                  </span>

                  <div className="activity-details">

                    <strong>
                      {activity.device}
                    </strong>

                    <p>
                      {activity.browser}
                    </p>

                    <small>
                      Logged in:{" "}
                      {formatDateTime(activity.time)}
                    </small>

                  </div>

                </div>

              ))

            ) : (

              <div className="no-activity">
                No login activity found
              </div>

            )}

          </div>

        </div>

        {/* EDIT PROFILE */}

        <div className="profile-card">

          <h2>Edit Profile</h2>

          <form onSubmit={updateProfile}>

            <Input
              label="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
            />

            <button
              type="submit"
              className="primary-btn"
            >
              Save Changes
            </button>

          </form>

        </div>

        {/* CHANGE PASSWORD */}

        <div className="profile-card">

          <h2>Change Password</h2>

          <form onSubmit={changePassword}>

            <Input
              label="Current Password"
              type="password"
              value={oldPassword}
              onChange={(e) =>
                setOldPassword(e.target.value)
              }
              placeholder="Enter current password"
            />

            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              placeholder="Enter new password"
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm new password"
            />

            <p className="password-info">
              Password must contain at least
              8 characters, one capital letter,
              one number, one special character,
              and no spaces.
            </p>

            <button
              type="submit"
              className="primary-btn"
            >
              Change Password
            </button>

          </form>

          {message && (
            <div className="success">
              {message}
            </div>
          )}

          {error && (
            <div className="error">
              {error}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;