import { useRef, useState } from "react";
import { useClickOutside } from "../../../../hooks";

export const Header = () => {
  const [dropdown, setDrodown] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setDrodown(false));

  return (
    <tr className="nk-tb-item nk-tb-head">
      <th className="nk-tb-col nk-tb-col-check">
        <div className="custom-control custom-control-sm custom-checkbox notext">
          <input
            type="checkbox"
            className="custom-control-input"
            id="pid-all"
          />
          <label className="custom-control-label" htmlFor="pid-all" />
        </div>
      </th>
      <th className="nk-tb-col">
        <span className="sub-text">Project Name</span>
      </th>
      <th className="nk-tb-col">
        <span className="sub-text">Date create</span>
      </th>
      <th className="nk-tb-col">
        <span className="sub-text">User</span>
      </th>
      <th className="nk-tb-col nk-tb-col-tools text-end">
        <div ref={dropdownRef} className={`dropdown ${dropdown ? "show" : ""}`}>
          <button
            href="#"
            className="btn btn-xs btn-trigger btn-icon dropdown-toggle me-n1"
            data-bs-toggle="dropdown"
            data-offset="0,5"
            onClick={() => setDrodown(!dropdown)}
          >
            <em className="icon ni ni-more-h" />
          </button>
          <div
            className={`dropdown-menu dropdown-menu-end ${
              dropdown ? "show" : ""
            }`}
          >
            <ul className="link-list-opt no-bdr">
              <li>
                <a href="#">
                  <em className="icon ni ni-trash" />
                  <span>Remove Projects</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </th>
    </tr>
  );
};
