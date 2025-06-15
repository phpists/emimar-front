import { NavLink, useLocation } from "react-router";

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="nk-apps-sidebar is-theme">
      <div className="nk-apps-brand">
        <NavLink to="/" className="logo-link">
          <img
            className="logo-light logo-img"
            src="/assets/images/small-logo.png"
            alt="logo"
          />
          <img
            className="logo-dark logo-img"
            src="/assets/images/small-logo.png"
            alt="logo-dark"
          />
        </NavLink>
      </div>

      <div
        className="nk-sidebar-element"
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <div className="nk-sidebar-body" style={{ flexGrow: 1 }}>
          <div
            className="nk-sidebar-content simplebar-scrollable-y"
            data-simplebar="init"
          >
            <div className="simplebar-content" style={{ padding: 0 }}>
              <div className="nk-sidebar-menu">
                <ul className="nk-menu apps-menu">
                  <li
                    className={`nk-menu-item ${
                      pathname === "/" ? "active" : ""
                    }`}
                  >
                    <NavLink
                      to="/"
                      className={`nk-menu-link ${
                        pathname === "/" ? "active current-page" : ""
                      }`}
                      aria-label="Dashboard"
                    >
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-table-view" />
                      </span>
                    </NavLink>
                  </li>
                  <li
                    className={`nk-menu-item ${
                      pathname === "/users" ? "active" : ""
                    }`}
                  >
                    <NavLink
                      to="/users"
                      className={`nk-menu-link ${
                        pathname === "/users" ? "active current-page" : ""
                      }`}
                      aria-label="Users"
                    >
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-user-list" />
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="nk-sidebar-footer">
            <NavLink
              to="/profile"
              className={`nk-menu-link d-flex align-items-center justify-content-center ${
                pathname === "/profile" ? "active current-page" : ""
              }`}
              aria-label="Profile"
            >
              <span className="nk-menu-icon">
                <em className="icon ni ni-user-alt" />
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
