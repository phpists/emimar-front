import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";
import { useNavigate } from "react-router";
import {useAppSelect} from "../../../hooks/redux";

export const Profile = () => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { user } = useAppSelect((state) => state.auth);
  useClickOutside(dropdownRef, () => setShow(false));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <li ref={dropdownRef} className="dropdown user-dropdown">
      <a
        href="#"
        className={`dropdown-toggle me-n1 ${show ? "show" : ""}`}
        data-bs-toggle="dropdown"
        onClick={() => setShow(!show)}
      >
        <div className="user-toggle">
          <div className="user-avatar sm">
            <em className="icon ni ni-user-alt" />
          </div>
        </div>
      </a>
      <div
        className={`dropdown-menu dropdown-menu-md dropdown-menu-end ${
          show ? "show" : ""
        }`}
      >
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card">
            <div className="user-avatar">
              <span>
                {user?.user?.full_name[0]?.toUpperCase() ?? ""}
                {user?.user?.full_name[1]?.toUpperCase() ?? ""}
              </span>
            </div>
            <div className="user-info">
              <span className="lead-text">{user?.user?.full_name}</span>
              <span className="sub-text">{user?.user?.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <ul className="link-list">
            <li>
              <a
                  href="/profile.html#/profile"
                  onClick={(e) => {
                    setShow(false);
                  }}
              >
                <em className="icon ni ni-user-alt" />
                <span>Profile settings</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown-inner">
          <ul className="link-list">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                <em className="icon ni ni-signout" />
                <span>Sign out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};
