import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useClickOutside } from "../../../hooks";
import { useActions } from "../../../hooks/actions";

export const Row = ({
  title,
  createAt,
  users,
  groups,
  onEdit,
  onDelete,
  selected,
  onSelect,
  id,
}) => {
  const [dropdown, setDrodown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const { selectProject } = useActions();

  useClickOutside(dropdownRef, () => setDrodown(false));

  const handleOpenProject = () => {
    selectProject(id);
    navigate("/project");
  };

  return (
    <tr className="nk-tb-item" onClick={handleOpenProject}>
      <td className="nk-tb-col nk-tb-col-check">
        <div
          className="custom-control custom-control-sm custom-checkbox notext"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            className="custom-control-input"
            id={`pid-${id}`}
            checked={selected}
            onChange={onSelect}
          />
          <label className="custom-control-label" htmlFor={`pid-${id}`} />
        </div>
      </td>
      <td className="nk-tb-col">
        <a href onClick={(e) => e.preventDefault()} className="project-title">
          <div className="user-avatar sq bg-purple">
            <span>
              {title?.[0]?.toUpperCase() ?? ""}
              {title?.[1]?.toUpperCase() ?? ""}
            </span>
          </div>
          <div className="project-info">
            <h6 className="title">{title}</h6>
          </div>
        </a>
      </td>
      <td className="nk-tb-col">
        <span>{createAt}</span>
      </td>
      <td className="nk-tb-col">
        <span>{users}</span>
      </td>{" "}
      <td className="nk-tb-col">
        <span>{groups}</span>
      </td>
      <td
        className="nk-tb-col nk-tb-col-tools"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="nk-tb-actions gx-1">
          <li>
            <div
              ref={dropdownRef}
              className={`drodown  ${dropdown ? "show" : ""}`}
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
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <em className="icon ni ni-eye" />
                      <span>View Project</span>
                    </a>
                  </li>
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
