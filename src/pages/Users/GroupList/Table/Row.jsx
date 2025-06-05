import { useRef, useState } from "react";
import { useClickOutside } from "../../../../hooks";

export const Row = () => {
  const [dropdown, setDrodown] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setDrodown(false));

  return (
    <tr className="nk-tb-item">
      <td className="nk-tb-col nk-tb-col-check">
        <div className="custom-control custom-control-sm custom-checkbox notext">
          <input type="checkbox" className="custom-control-input" id="pid-01" />
          <label className="custom-control-label" htmlFor="pid-01" />
        </div>
      </td>
      <td className="nk-tb-col">
        <a href="#" className="project-title">
          <div className="user-avatar sq bg-purple">
            <span>DD</span>
          </div>
          <div className="project-info">
            <h6 className="title">Dashlite Development</h6>
          </div>
        </a>
      </td>
      <td className="nk-tb-col">
        <span>02.06.2025</span>
      </td>
      <td className="nk-tb-col">
        <span>Ivan</span>
      </td>
      <td className="nk-tb-col nk-tb-col-tools">
        <ul className="nk-tb-actions gx-1">
          <li>
            <div
              ref={dropdownRef}
              className={`drodown ${dropdown ? "show" : ""}`}
            >
              <a
                href="#"
                className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                data-bs-toggle="dropdown"
                onClick={() => setDrodown(!dropdown)}
              >
                <em className="icon ni ni-more-h" />
              </a>
              <div
                className={`dropdown-menu dropdown-menu-end ${
                  dropdown ? "show" : ""
                }`}
              >
                <ul className="link-list-opt no-bdr">
                  <li>
                    <a href="./project.html">
                      <em className="icon ni ni-trash" />
                      <span>Remove</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <em className="icon ni ni-edit" />
                      <span>Edit Project</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </td>
    </tr>
  );
};
