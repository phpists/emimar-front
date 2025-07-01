import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";

export const MobileHeader = ({ onOpenUploadModal, onCreateFolder, selected }) => {
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setDropdown(false));

  return (
    <div className="nk-block-head nk-block-head-sm">
      <div className="nk-block-between position-relative">
        <div className="nk-block-head-content">
          <h3 className="nk-block-title page-title">{selected?.title && <span>{selected.title}</span>}</h3>
        </div>
        <div className="nk-block-head-content">
          <ul className="nk-block-tools g-1">
            <li className="d-lg-none">
              <a
                href="#"
                className="btn btn-trigger btn-icon search-toggle toggle-search"
                data-target="search"
                onClick={() => setSearch(true)}
              >
                <em className="icon ni ni-search" />
              </a>
            </li>
            <li className="d-lg-none">
              <div
                ref={dropdownRef}
                className={`dropdown ${dropdown ? "show" : ""}`}
              >
                <a
                  href="#"
                  className="btn btn-trigger btn-icon"
                  data-bs-toggle="dropdown"
                  onClick={() => setDropdown(!dropdown)}
                >
                  <em className="icon ni ni-plus" />
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
          </ul>
        </div>
        <div
          className={`search-wrap px-2 d-lg-none ${search ? "active" : ""}`}
          data-search="search"
        >
          <div className="search-content">
            <a
              href="#"
              className="search-back btn btn-icon toggle-search"
              data-target="search"
              onClick={() => setSearch(false)}
            >
              <em className="icon ni ni-arrow-left" />
            </a>
            <input
              type="text"
              className="form-control border-transparent form-focus-none"
              placeholder="Search files, folders"
            />
            <button className="search-submit btn btn-icon">
              <em className="icon ni ni-search" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
