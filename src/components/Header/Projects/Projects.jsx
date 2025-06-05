import { useRef, useState } from "react";
import { useLocation } from "react-router";
import { useClickOutside } from "../../../hooks";

export const Projects = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setShow(false));

  if (pathname !== "/project") {
    return null;
  }

  return (
    <div className="nk-header-app-name">
      <div className="nk-header-app-logo">
        <em className="icon ni ni-folder bg-purple-dim" />
      </div>
      <div className="nk-header-app-info">
        <span className="lead-text">
          <div ref={dropdownRef} className="dropdown">
            <a
              href="#"
              className={`dropdown-toggle btn btn-light ${show ? "show" : ""}`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setShow(!show)}
            >
              Dashlite Development
            </a>
            <div className={`dropdown-menu ${show ? "show" : ""}`} style={{}}>
              <ul className="link-list-opt no-bdr">
                <li>
                  <div className="nk-fmg-search project-search">
                    <em className="icon ni ni-search" />
                    <input
                      type="text"
                      className="form-control border-transparent form-focus-none"
                      placeholder="Search files, folders"
                    />
                  </div>
                </li>
                <li className="divider" />
                <li>
                  <a href="#">
                    <span>Project 1</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>Project 2</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>Project 3</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};
