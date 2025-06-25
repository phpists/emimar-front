import {NavLink, useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {useClickOutside} from "../../../hooks";
import {useAppSelect} from "../../../hooks/redux";
import {useEffect, useRef, useState} from "react";
import {useActions} from "../../../hooks/actions";
export const Profile = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { user } = useAppSelect((state) => state.auth);
  const { logoutUser } = useActions();
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setShow(false));

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (user?.id) {
      setCurrentUser(user);
    } else if (user?.user?.id) {
      setCurrentUser(user.user);
    }
  }, [user]);

  if (!currentUser) return null;

  return (
      <li ref={dropdownRef} className="dropdown user-dropdown">
        <a
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
                {currentUser.full_name?.[0]?.toUpperCase() ?? ""}
                {currentUser.full_name?.[1]?.toUpperCase() ?? ""}
              </span>
              </div>
              <div className="user-info">
                <span className="lead-text">{currentUser.full_name}</span>
                <span className="sub-text">{currentUser.email}</span>
              </div>
            </div>
          </div>
          <div className="dropdown-inner">
            <ul className="link-list">
              <li>
                <NavLink
                    to="/profile"
                    className="logo-link"
                    onClick={() => setShow(false)}
                >
                  <em className="icon ni ni-user-alt" />
                  <span>Profile settings</span>
                </NavLink>
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
