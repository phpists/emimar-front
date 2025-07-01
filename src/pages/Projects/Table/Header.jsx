import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";
import {Arrow} from "../../../components/Arrow";

export const Header = ({ sortBy, sortDesc, onSortChange, onDelete, isAdmin }) => {
  const [dropdown, setDrodown] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setDrodown(false));

  return (
      <tr className="nk-tb-item nk-tb-head">
          <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                #
              </span>
          </th>
          <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                No.
              </span>
          </th>
          <th className="nk-tb-col" style={{cursor: "pointer"}} onClick={() => onSortChange("title")}>
              <span className="sub-text d-flex align-items-center">
                Name
                <Arrow active={sortBy === "title"} desc={sortDesc}/>
              </span>
          </th>
          <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                Address
              </span>
          </th>
          <th className="nk-tb-col" style={{cursor: "pointer"}} onClick={() => onSortChange("created_at")}>
              <span className="sub-text d-flex align-items-center">
                Date create
                <Arrow active={sortBy === "created_at"} desc={sortDesc}/>
              </span>
          </th>
          <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                Users
              </span>
          </th>
          <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                Groups
              </span>
          </th>
          <th className="nk-tb-col nk-tb-col-tools text-end">
              {isAdmin && (
                  <div ref={dropdownRef} className={`dropdown ${dropdown ? "show" : ""}`}>
                      <button
                          href="#"
                          className="btn btn-xs btn-trigger btn-icon dropdown-toggle me-n1"
                          data-bs-toggle="dropdown"
                          data-offset="0,5"
                          onClick={() => setDrodown(!dropdown)}
                      >
                          <em className="icon ni ni-more-h"/>
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
                                      <em className="icon ni ni-trash"/>
                                      <span>Delete Projects</span>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </div>
              )}
          </th>
      </tr>
  );
};
