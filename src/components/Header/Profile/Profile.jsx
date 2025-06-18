import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";
import { useNavigate } from "react-router";

export const Profile = ({userData}) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

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
        onClick={(e) => {
          e.preventDefault();
          setShow(!show)
        }}
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
              <span>AB</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{userData?.response?.user?.display_name}</span>
              <span className="sub-text">{userData?.response?.user?.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <ul className="link-list">
            <li>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/profile");
                }}>
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
