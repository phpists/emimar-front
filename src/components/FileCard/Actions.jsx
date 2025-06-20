import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks";

export const Actions = ({ onEdit, onDelete, onOpen, onDownload, onMoveUp }) => {
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

              {onOpen ? (
                  <li>
                      <a
                          href="#"
                          onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation()
                              onOpen();
                              setShow(false);
                          }}
                      >
                          <em className="icon ni ni-eye" />
                          <span>Open</span>
                      </a>
                  </li>
              ): null}

              {onMoveUp ? (
                  <li>
                      <a
                          href="#"
                          onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation()
                              onMoveUp();
                              setShow(false);
                          }}
                      >
                          <em className="icon ni ni-upload" />
                          <span>Move up</span>
                      </a>
                  </li>
              ): null}

              {onDownload ? (
                  <li>
                      <a
                          href="#"
                          onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation()
                              onDownload();
                              setShow(false);
                          }}
                      >
                          <em className="icon ni ni-download" />
                          <span>Download</span>
                      </a>
                  </li>
              ): null}

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

              {onDelete ? (
                  <li>
                      <a
                          href="#"
                          onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onDelete();
                          }}
                      >
                          <em className="icon ni ni-trash"/>
                          <span>Delete</span>
                      </a>
                  </li>
              ): null}


          </ul>
        </div>
      </div>
    </div>
  );
};
