import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";

export const Header = ({ onOpenUploadModal, onCreateFolder }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setDropdown(false));

  return (
    <div className="nk-fmg-body-head d-none d-lg-flex">
      <div className="nk-fmg-search">
        <em className="icon ni ni-search" />
        <input
          type="text"
          className="form-control border-transparent form-focus-none"
          placeholder="Search files, folders"
        />
      </div>
      <div className="nk-fmg-actions">
        <ul className="nk-block-tools g-3">
          <li>
            <div
              ref={dropdownRef}
              className={`dropdown ${dropdown ? "show" : ""}`}
            >
              <a
                href="#"
                className="btn btn-light"
                data-bs-toggle="dropdown"
                onClick={() => setDropdown(!dropdown)}
              >
                <em className="icon ni ni-plus" />
                <span>Create</span>
              </a>
              <div
                className={`dropdown-menu dropdown-menu-end ${
                  dropdown ? "show" : ""
                }`}
              >
                <ul className="link-list-opt no-bdr">
                  <li onClick={onOpenUploadModal}>
                    <a href="#file-upload" data-bs-toggle="modal">
                      <em className="icon ni ni-upload-cloud" />
                      <span>Upload File</span>
                    </a>
                  </li>
                  <li onClick={onCreateFolder}>
                    <a href="#">
                      <em className="icon ni ni-folder-plus" />
                      <span>Create Folder</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <a
              href="#file-upload"
              className="btn btn-primary"
              data-bs-toggle="modal"
              onClick={onOpenUploadModal}
            >
              <em className="icon ni ni-upload-cloud" />
              <span>Upload</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
