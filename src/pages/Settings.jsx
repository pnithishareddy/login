import { useState } from "react";

function Settings({
  user,
  goDashboard,
  goProfile,
  logout
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState("");

  const saveSettings = () => {
    setMessage("Settings saved successfully");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <div
      className={
        darkMode
          ? "settings-page dark"
          : "settings-page"
      }
    >

      {/* Sidebar */}

      <aside className="sidebar">

        <div className="logo">
          Auth<span>Dash</span>
        </div>

        <nav>

          <button onClick={goDashboard}>
            Dashboard
          </button>

          <button onClick={goProfile}>
            Profile
          </button>

          <button className="active">
            Settings
          </button>

        </nav>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </aside>


      {/* Settings Main Content */}

      <main className="settings-main">

        <header className="settings-header">

          <div>

            <h1>
              Settings
            </h1>

            <p>
              Manage your dashboard preferences
            </p>

          </div>

          <button
            className="profile-btn"
            onClick={goProfile}
          >
            {user.name
              .charAt(0)
              .toUpperCase()}
          </button>

        </header>


        {/* Appearance */}

        <section className="settings-card">

          <h2>
            Appearance
          </h2>

          <p className="settings-description">
            Customize how your dashboard looks.
          </p>

          <div className="settings-option">

            <div>

              <strong>
                Dark Mode
              </strong>

              <p>
                Change the dashboard appearance
              </p>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) =>
                  setDarkMode(
                    e.target.checked
                  )
                }
              />

              <span className="slider"></span>

            </label>

          </div>

        </section>


        {/* Notifications */}

        <section className="settings-card">

          <h2>
            Notifications
          </h2>

          <p className="settings-description">
            Manage your notification preferences.
          </p>

          <div className="settings-option">

            <div>

              <strong>
                Email Notifications
              </strong>

              <p>
                Receive email notifications
              </p>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) =>
                  setNotifications(
                    e.target.checked
                  )
                }
              />

              <span className="slider"></span>

            </label>

          </div>

        </section>


        {/* Account */}

        <section className="settings-card">

          <h2>
            Account
          </h2>

          <p className="settings-description">
            Your account information.
          </p>

          <div className="account-info">

            <div>

              <strong>
                Name
              </strong>

              <p>
                {user.name}
              </p>

            </div>

            <div>

              <strong>
                Email
              </strong>

              <p>
                {user.email}
              </p>

            </div>

          </div>

        </section>


        {/* Save Settings */}

        <button
          className="primary-btn save-settings"
          onClick={saveSettings}
        >
          Save Settings
        </button>


        {/* Success Message */}

        {message && (
          <div className="success">
            {message}
          </div>
        )}

      </main>

    </div>
  );
}

export default Settings;