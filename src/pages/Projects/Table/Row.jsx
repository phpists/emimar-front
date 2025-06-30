import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useClickOutside } from "../../../hooks";
import { useActions } from "../../../hooks/actions";
import {useAppSelect} from "../../../hooks/redux";
import {ROLES} from "../../../constats/roles";

export const Row = ({
  title,
  address,
  createAt,
  users,
  groups,
  onEdit,
  onDelete,
  index,
  selected,
  onSelect,
  isAdmin,
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
          <td className="nk-tb-col">
              <span>{index}</span>
          </td>
          <td className="nk-tb-col cursor-pointer" onClick={(e) => e.preventDefault()}>
              <div className="project-title">
                  <div className="user-avatar sq bg-purple">
            <span>
              {title?.[0]?.toUpperCase() ?? ""}
                {title?.[1]?.toUpperCase() ?? ""}
            </span>
                  </div>
                  <div className="project-info">
                      <h6 className="title">{title}</h6>
                  </div>
              </div>
          </td>
          <td className="nk-tb-col">
              <span>{address}</span>
          </td>
          <td className="nk-tb-col">
              <span>{createAt}</span>
          </td>
          <td className="nk-tb-col">
              <span>{users}</span>
          </td>
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
                              onClick={(e) => {
                                  e.preventDefault();
                                  setDrodown(!dropdown);
                              }}
                          >
                              <em className="icon ni ni-more-h"/>
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
                                              handleOpenProject();
                                          }}
                                      >
                                          <em className="icon ni ni-eye"/>
                                          <span>View Project</span>
                                      </a>
                                  </li>
                                  {isAdmin && (
                                      <li>
                                          <a
                                              href="#"
                                              onClick={(e) => {
                                                  e.preventDefault();
                                                  onDelete();
                                              }}
                                          >
                                              <em className="icon ni ni-trash"/>
                                              <span>Delete</span>
                                          </a>
                                      </li>
                                  )}
                                  <li>
                                      <a
                                          href="#"
                                          onClick={(e) => {
                                              e.preventDefault();
                                              onEdit();
                                          }}
                                      >
                                          <em className="icon ni ni-edit"/>
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
