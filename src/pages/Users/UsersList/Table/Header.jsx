import { useRef, useState } from "react";
import { useClickOutside } from "../../../../hooks";

export const Header = ({ isSelectedAll, onSelectAll, onDelete , onSortGroups, sortConfig }) => {
  const [dropdown, setDrodown] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setDrodown(false));

  const renderSortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.order === "asc" ? " ↑" : " ↓";
  };

  return (
    <tr className="nk-tb-item nk-tb-head">
      <th className="nk-tb-col nk-tb-col-check">
        <div
          className="custom-control custom-control-sm custom-checkbox notext"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type="checkbox"
            className="custom-control-input"
            id="pid-all"
            checked={isSelectedAll}
            onChange={(e) => onSelectAll()}
          />
          <label className="custom-control-label" htmlFor="pid-all" />
        </div>
      </th>
      <th className="nk-tb-col" onClick={() => onSortGroups("display_name")}>
        <span className="sub-text">Name{renderSortArrow("display_name")}</span>
      </th>
      <th className="nk-tb-col" onClick={() => onSortGroups("created_at")}>
        <span className="sub-text">Date create{renderSortArrow("created_at")}</span>
      </th>
      <th className="nk-tb-col" onClick={() => onSortGroups("email")}>
        <span className="sub-text">Email{renderSortArrow("email")}</span>
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
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete();
                  }}
                >
                  <em className="icon ni ni-trash" />
                  <span>Delete users</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </th>
    </tr>
  );
};
