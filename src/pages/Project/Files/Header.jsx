import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";
import {useTranslation} from "react-i18next";

export const Header = ({
  onOpenUploadModal,
  onCreateFolder,
  selected,
  search,
  onGoUp,
  isRootSelected,
  onSearch,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();
  const { t } = /** @type {any} */ useTranslation('common');

  useClickOutside(dropdownRef, () => setDropdown(false));

  return (
    <div className="nk-fmg-body-head d-none d-lg-flex">
      <div className="nk-fmg-search">
        <em className="icon ni ni-search" />
        <input
          type="text"
          className="form-control border-transparent form-focus-none"
          placeholder={`${t('SearchFoldersAndFilesIn')} ${selected?.full_name ? selected.full_name : "global"}`}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {selected ? (
        <div className="nk-fmg-actions">
          <ul className="nk-block-tools g-3">
            {!isRootSelected && (
                <li>
                  <a
                      href="#"
                      className="btn btn-light"
                      data-bs-toggle="modal"
                      onClick={(e) => {
                        e.preventDefault();
                        onGoUp();
                      }}
                  >
                    <em className="icon ni ni-arrow-up"/>
                    <span>{t('MoveUp')}</span>
                  </a>
                </li>
            )}
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
                  <em className="icon ni ni-plus"/>
                  <span>{t('Create')}</span>
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
                        <em className="icon ni ni-upload-cloud"/>
                        <span>{t('UploadFile')}</span>
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
                        <em className="icon ni ni-folder-plus"/>
                        <span>{t('CreateFolder')}</span>
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
                <em className="icon ni ni-upload-cloud"/>
                <span>{t('Upload')}</span>
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};
