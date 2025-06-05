import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";

export const Language = () => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setShow(false));

  return (
    <li
      ref={dropdownRef}
      className={`dropdown language-dropdown d-none d-sm-block me-n1 ${
        show ? "show" : ""
      }`}
    >
      <a
        href="#"
        className="dropdown-toggle nk-quick-nav-icon"
        data-bs-toggle="dropdown"
        onClick={() => setShow(!show)}
      >
        <div className="quick-icon border border-light">
          <img className="icon" src="/assets/images/english-sq.png" alt />
        </div>
      </a>
      <div
        className={`dropdown-menu dropdown-menu-end dropdown-menu-s1 ${
          show ? "show" : ""
        }`}
      >
        <ul className="language-list">
          <li>
            <a href="#" className="language-item">
              <img
                src="/assets/images/english.png"
                alt
                className="language-flag"
              />
              <span className="language-name">English</span>
            </a>
          </li>
          <li>
            <a href="#" className="language-item">
              <img
                src="/assets/images/russia.webp"
                alt
                className="language-flag"
              />
              <span className="language-name">Русский</span>
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
};
