import { NavLink } from "react-router";

export const MobileSidebar = ({ active }) => {
  return (
    <div>
      <div
        className={`nk-sidebar is-light ${active ? "nk-sidebar-active" : ""}`}
        data-content="sidebarMenu"
      >
        <div
          className="nk-sidebar-inner simplebar-scrollable-y"
          data-simplebar="init"
        >
          <div
            className="simplebar-wrapper"
            style={{ margin: "-24px -28px -32px" }}
          >
            <div className="simplebar-height-auto-observer-wrapper">
              <div className="simplebar-height-auto-observer" />
            </div>
            <div className="simplebar-mask">
              <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
                <div
                  className="simplebar-content-wrapper"
                  tabIndex={0}
                  role="region"
                  aria-label="scrollable content"
                  style={{ height: "auto", overflow: "hidden scroll" }}
                >
                  <div
                    className="simplebar-content"
                    style={{ padding: "24px 28px 32px" }}
                  >
                    <ul className="nk-menu nk-menu-md">
                      <li className="nk-menu-item">
                        <NavLink to="/" className="nk-menu-link">
                          <span className="nk-menu-icon">
                            <em className="icon ni ni-dashboard" />
                          </span>
                          <span className="nk-menu-text"> Dashboard</span>
                        </NavLink>
                      </li>{" "}
                      <li className="nk-menu-item">
                        <NavLink to="/profile" className="nk-menu-link">
                          <span className="nk-menu-icon">
                            <em className="icon ni ni-user-alt" />
                          </span>
                          <span className="nk-menu-text"> Profile</span>
                        </NavLink>
                      </li>{" "}
                      <li className="nk-menu-item">
                        <NavLink to="/users" className="nk-menu-link">
                          <span className="nk-menu-icon">
                            <em className="icon ni ni-user-list"></em>{" "}
                          </span>
                          <span className="nk-menu-text">Users</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="simplebar-placeholder"
              style={{ width: 279, height: 1125 }}
            />
          </div>
          <div
            className="simplebar-track simplebar-horizontal"
            style={{ visibility: "hidden" }}
          >
            <div
              className="simplebar-scrollbar"
              style={{ width: 0, display: "none" }}
            />
          </div>
          <div
            className="simplebar-track simplebar-vertical"
            style={{ visibility: "visible" }}
          >
            <div
              className="simplebar-scrollbar"
              style={{
                height: 393,
                display: "block",
                transform: "translate3d(0px, 0px, 0px)",
              }}
            />
          </div>
        </div>
      </div>
      {active ? (
        <div className="nk-sidebar-overlay" data-target="sidebarMenu"></div>
      ) : null}
    </div>
  );
};
