import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";

export const Header = ({
  onOpenUploadModal,
  onCreateFolder,
  selected,
  search,
  onSearch,
}) => {
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
          placeholder={`Search files, folders in ${selected?.title ? selected.title : "global"}`}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {selected ? (
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
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdown(!dropdown);
                  }}
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
                    <li>
                      <a
                        href="#file-upload"
                        data-bs-toggle="modal"
                        onClick={(e) => {
                          e.preventDefault();
                          onOpenUploadModal();
                        }}
                      >
                        <em className="icon ni ni-upload-cloud" />
                        <span>Upload File</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onCreateFolder();
                        }}
                      >
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
                onClick={(e) => {
                  e.preventDefault();
                  onOpenUploadModal();
                }}
              >
                <em className="icon ni ni-upload-cloud" />
                <span>Upload</span>
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};
