import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";
import i18n from "../../../i18n";

const LANGUAGES = [
  { code: "en", label: "English", flag: "/assets/images/english.png" },
  { code: "ru", label: "Русский", flag: "/assets/images/russia.webp" },
];

export const Language = () => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();

  const currentLang = i18n.language || localStorage.getItem('lang') || 'en';

  useClickOutside(dropdownRef, () => setShow(false));

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setShow(false);
  };

  const currentFlag = LANGUAGES.find(l => l.code === currentLang)?.flag;

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
          <img className="icon" src={currentFlag} alt="Flag icon"/>
        </div>
      </div>
      <div
          className={`dropdown-menu dropdown-menu-end dropdown-menu-s1 ${
          show ? "show" : ""
        }`}
      >
        <ul className="language-list">
          {LANGUAGES.map(({ code, label, flag }) => (
              <li key={code} onClick={() => changeLanguage(code)} style={{cursor: "pointer"}}>
                <div className="language-item">
                  <img src={flag} alt={`${label} flag`} className="language-flag" />
                  <span className="language-name">{label}</span>
                </div>
              </li>
          ))}
        </ul>
      </div>
    </li>
  );
};
