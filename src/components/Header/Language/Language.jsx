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
      <div
        className="dropdown-toggle nk-quick-nav-icon"
        data-bs-toggle="dropdown"
        onClick={() => setShow(!show)}
      >
        <div className="quick-icon border border-light">
          <img className="icon" src="/assets/images/english-sq.png" alt="Flag icon" />
        </div>
      </div>
      <div
        className={`dropdown-menu dropdown-menu-end dropdown-menu-s1 ${
          show ? "show" : ""
        }`}
      >
        <ul className="language-list">
          <li>
            <div className="language-item">
              <img
                src="/assets/images/english.png"
                alt="USA flag icon"
                className="language-flag"
              />
              <span className="language-name">English</span>
            </div>
          </li>
          <li>
            <div className="language-item">
              <img
                src="/assets/images/russia.webp"
                alt="Russian flag icon"
                className="language-flag"
              />
              <span className="language-name">Русский</span>
            </div>
          </li>
        </ul>
      </div>
    </li>
  );
};
