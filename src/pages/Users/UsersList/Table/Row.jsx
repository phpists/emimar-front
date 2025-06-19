import { useRef, useState } from "react";
import { useClickOutside } from "../../../../hooks";

export const Row = ({
  name,
  email,
  createAt,
  onDelete,
  onEdit,
  onEditPassword,
  id,
  selected,
  onSelect,
  index
}) => {
  const [dropdown, setDrodown] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setDrodown(false));
  return (
    <tr className="nk-tb-item">
      <td className="nk-tb-col nk-tb-col-check">
        <div
          className="custom-control custom-control-sm custom-checkbox notext"
          onClick={(e) => e.stopPropagation()}
        >
          {index+1}
          {/* <input
            type="checkbox"
            className="custom-control-input"
            id={`pid-${id}`}
            checked={selected}
            onChange={onSelect}
          />
          <label className="custom-control-label" htmlFor={`pid-${id}`} /> */}
        </div>
      </td>
      <td className="nk-tb-col">
        <div className="project-title">
          <div className="project-info">
            <h6 className="title">{name}</h6>
          </div>
        </div>
      </td>
      <td className="nk-tb-col">
        <span>{createAt}</span>
      </td>
      <td className="nk-tb-col">
        <span>{email}</span>
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
                onClick={(e) => {
                  e.preventDefault();
                  setDrodown(!dropdown);
                }}
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
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onDelete();
                      }}
                    >
                      <em className="icon ni ni-trash" />
                      <span>Delete</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onEditPassword();
                      }}
                    >
                      <em className="icon ni ni-edit" />
                      <span>Сhange password</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onEdit();
                      }}
                    >
                      <em className="icon ni ni-edit" />
                      <span>Edit</span>
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
