import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks";

export const Actions = ({ onEdit, onDelete }) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setShow(false));

  return (
    <div className="nk-file-actions">
      <div className={`dropdown ${show ? "show" : ""}`} ref={dropdownRef}>
        <a
          href
          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
          data-bs-toggle="dropdown"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation()
            setShow(!show);
          }}
        >
          <em className="icon ni ni-more-h" />
        </a>
        <div
          className={`dropdown-menu dropdown-menu-end ${show ? "show" : ""}`}
        >
          <ul className="link-list-plain no-bdr">
            {onEdit ? (
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation()
                    onEdit();
                  }}
                >
                  <em className="icon ni ni-pen" />
                  <span>Edit</span>
                </a>
              </li>
            ) : null}

            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <em className="icon ni ni-trash" />
                <span>Delete</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
