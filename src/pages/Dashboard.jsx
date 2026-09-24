import { useState } from "react";

function Dashboard({
  user,
  goProfile,
  goSettings,
  logout
}) {
  const [search, setSearch] = useState("");

  const cards = [
    {
      title: "Total Users",
      value: "1,250",
      icon: "👥"
    },
    {
      title: "Active Sessions",
      value: "320",
      icon: "🟢"
    },
    {
      title: "Messages",
      value: "86",
      icon: "💬"
    },
    {
      title: "Notifications",
      value: "12",
      icon: "🔔"
    }
  ];

  const filteredCards = cards.filter((card) =>
    card.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      {/* Sidebar */}

      <aside className="sidebar">

        <div className="logo">
          Auth<span>Dash</span>
        </div>

        <nav>

          <button className="active">
            Dashboard
          </button>

          <button onClick={goProfile}>
            Profile
          </button>

          <button onClick={goSettings}>
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


      {/* Main Content */}

      <main className="main-content">

        <header className="topbar">

          <div>

            <h1>
              Dashboard
            </h1>

            <p>
              Welcome back, {user.name}
            </p>

          </div>

          <button
            onClick={goProfile}
            className="profile-btn"
          >
            {user.name
              .charAt(0)
              .toUpperCase()}
          </button>

        </header>


        {/* Search */}

        <div className="search-container">

          <input
            type="text"
            placeholder="Search dashboard..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {/* Dashboard Cards */}

        <section className="cards">

          {filteredCards.length > 0 ? (

            filteredCards.map((card) => (

              <div
                className="dashboard-card"
                key={card.title}
              >

                <div className="card-icon">
                  {card.icon}
                </div>

                <div>

                  <p>
                    {card.title}
                  </p>

                  <h2>
                    {card.value}
                  </h2>

                </div>

              </div>

            ))

          ) : (

            <div className="empty-state">
              No results found
            </div>

          )}

        </section>


        {/* Welcome Section */}

        <section className="welcome-box">

          <h2>
            Authentication Dashboard
          </h2>

          <p>
            You are successfully logged in.
            Manage your profile and dashboard
            settings from the menu.
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