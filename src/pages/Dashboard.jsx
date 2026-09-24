import { useState } from "react";

function Dashboard({ user, goProfile, goSettings, logout }) {
  const [search, setSearch] = useState("");

  const cards = [
    { title: "Total Users", value: "1,250", icon: "👥" },
    { title: "Active Sessions", value: "320", icon: "🟢" },
    { title: "Messages", value: "86", icon: "💬" },
    { title: "Notifications", value: "12", icon: "🔔" },
    { title: "New Users", value: "48", icon: "➕" },
    { title: "Revenue", value: "₹85,600", icon: "💰" }
  ];

  const users = [
    { id: 1, name: "Rahul", email: "rahul@gmail.com", status: "Active", role: "User" },
    { id: 2, name: "Priya", email: "priya@gmail.com", status: "Active", role: "Admin" },
    { id: 3, name: "Arun", email: "arun@gmail.com", status: "Inactive", role: "User" },
    { id: 4, name: "Sneha", email: "sneha@gmail.com", status: "Active", role: "User" },
    { id: 5, name: "Kiran", email: "kiran@gmail.com", status: "Inactive", role: "User" }
  ];

  const filteredUsers = users.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      <aside className="sidebar">

        <div className="logo">
          Auth<span>Dash</span>
        </div>

        <nav>
          <button className="active">Dashboard</button>
          <button onClick={goProfile}>Profile</button>
          <button onClick={goSettings}>Settings</button>
        </nav>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </aside>

      <main className="main-content">

        <header className="topbar">

          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, {user.name}</p>
          </div>

          <button onClick={goProfile} className="profile-btn">
            {user.name.charAt(0).toUpperCase()}
          </button>

        </header>

        <div className="search-container">

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <section className="cards">

          {cards.map((card) => (
            <div className="dashboard-card" key={card.title}>

              <div className="card-icon">
                {card.icon}
              </div>

              <div>
                <p>{card.title}</p>
                <h2>{card.value}</h2>
              </div>

            </div>
          ))}

        </section>

        <section className="dashboard-section">

          <div className="section-header">
            <h2>Recent Users</h2>
            <p>Recently registered users</p>
          </div>

          <div className="table-container">

            {filteredUsers.length > 0 ? (

              <table className="user-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredUsers.map((item) => (
                    <tr key={item.id}>

                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>

                      <td>
                        <span
                          className={
                            item.status === "Active"
                              ? "status-active"
                              : "status-inactive"
                          }
                        >
                          {item.status}
                        </span>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            ) : (

              <div className="empty-state">
                No users found
              </div>

            )}

          </div>

        </section>

        <section className="dashboard-row">

          <div className="dashboard-box">

            <h2>Recent Activities</h2>

            <div className="activity">
              <span>👤</span>
              <div>
                <strong>New user registered</strong>
                <p>Rahul created an account</p>
              </div>
            </div>

            <div className="activity">
              <span>🔑</span>
              <div>
                <strong>Password changed</strong>
                <p>Priya changed her password</p>
              </div>
            </div>

            <div className="activity">
              <span>📧</span>
              <div>
                <strong>New message</strong>
                <p>You received a new message</p>
              </div>
            </div>

          </div>

          <div className="dashboard-box">

            <h2>Quick Information</h2>

            <div className="info-row">
              <span>Account Status</span>
              <strong>Active</strong>
            </div>

            <div className="info-row">
              <span>Login Status</span>
              <strong>Online</strong>
            </div>

            <div className="info-row">
              <span>Role</span>
              <strong>Administrator</strong>
            </div>

            <div className="info-row">
              <span>Notifications</span>
              <strong>12</strong>
            </div>

          </div>

        </section>

        <section className="quick-actions">

          <h2>⚡ Quick Actions</h2>

          <div className="quick-action-grid">

            <button
              className="quick-action-btn"
              onClick={goProfile}
            >
              <span>👤</span>
              <div>
                <strong>View Profile</strong>
                <p>Manage your profile</p>
              </div>
            </button>

            <button
              className="quick-action-btn"
              onClick={goSettings}
            >
              <span>⚙️</span>
              <div>
                <strong>Settings</strong>
                <p>Manage preferences</p>
              </div>
            </button>

            <button
              className="quick-action-btn"
              onClick={goProfile}
            >
              <span>🔑</span>
              <div>
                <strong>Change Password</strong>
                <p>Update your password</p>
              </div>
            </button>

            <button
              className="quick-action-btn"
              onClick={() => alert("You have 12 notifications")}
            >
              <span>🔔</span>
              <div>
                <strong>Notifications</strong>
                <p>View your notifications</p>
              </div>
            </button>

          </div>

        </section>

        <section className="welcome-box">

          <h2>Authentication Dashboard</h2>

          <p>
            You are successfully logged in.
            Manage your profile and dashboard settings from the menu.
          </p>

          <button
            className="primary-btn small"
            onClick={goProfile}
          >
            Manage Profile
          </button>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;