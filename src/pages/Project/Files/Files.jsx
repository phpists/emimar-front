import { useState } from "react";
import { Header } from "./Header";
import { MobileHeader } from "./MobileHeader";
import { UploadModal } from "./UploadModal";
import { FolderModal } from "./FolderModal";

export const Files = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const [folderModal, setFolderModal] = useState(false);

  const handleOpenUploadModal = () => setUploadModal(true);
  const handleOpenFolderModal = () => setFolderModal(true);

  return (
    <div className="nk-fmg-body">
      <Header
        onOpenUploadModal={handleOpenUploadModal}
        onCreateFolder={handleOpenFolderModal}
      />
      {uploadModal ? (
        <UploadModal onClose={() => setUploadModal(false)} />
      ) : null}
      {folderModal ? (
        <FolderModal onClose={() => setFolderModal(false)} />
      ) : null}
      <div className="nk-fmg-body-content">
        <MobileHeader
          onOpenUploadModal={handleOpenUploadModal}
          onCreateFolder={handleOpenFolderModal}
        />
        <div className="nk-fmg-quick-list nk-block">
          <div className="nk-block-head-xs">
            <div className="nk-block-between g-2">
              <div className="nk-block-head-content">
                <h6 className="nk-block-title title">Quick Access</h6>
              </div>
            </div>
          </div>
          <div
            className="toggle-expand-content expanded"
            data-content="quick-access"
          >
            <div className="nk-files nk-files-view-grid">
              <div className="nk-files-list">
                <div className="nk-file-item nk-file">
                  <div className="nk-file-info">
                    <a href="#" className="nk-file-link">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              viewBox="0 0 72 72"
                            >
                              <path
                                fill="#6C87FE"
                                d="M57.5,31h-23c-1.4,0-2.5-1.1-2.5-2.5v-10c0-1.4,1.1-2.5,2.5-2.5h23c1.4,0,2.5,1.1,2.5,2.5v10	C60,29.9,58.9,31,57.5,31z"
                              />
                              <path
                                fill="#8AA3FF"
                                d="M59.8,61H12.2C8.8,61,6,58,6,54.4V17.6C6,14,8.8,11,12.2,11h18.5c1.7,0,3.3,1,4.1,2.6L38,24h21.8	c3.4,0,6.2,2.4,6.2,6v24.4C66,58,63.2,61,59.8,61z"
                              />
                              <path
                                display="none"
                                fill="#8AA3FF"
                                d="M62.1,61H9.9C7.8,61,6,59.2,6,57c0,0,0-31.5,0-42c0-2.2,1.8-4,3.9-4h19.3	c1.6,0,3.2,0.2,3.9,2.3l2.7,6.8c0.5,1.1,1.6,1.9,2.8,1.9h23.5c2.2,0,3.9,1.8,3.9,4v31C66,59.2,64.2,61,62.1,61z"
                              />
                              <path
                                fill="#798BFF"
                                d="M7.7,59c2.2,2.4,4.7,2,6.3,2h45c1.1,0,3.2,0.1,5.3-2H7.7z"
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <span className="title">UI Design</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="nk-file-actions hideable">
                    <a href="#" className="btn btn-sm btn-icon btn-trigger">
                      <em className="icon ni ni-cross" />
                    </a>
                  </div>
                </div>
                <div className="nk-file-item nk-file">
                  <div className="nk-file-info">
                    <a href="#" className="nk-file-link">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              viewBox="0 0 72 72"
                            >
                              <path
                                fill="#6C87FE"
                                d="M57.5,31h-23c-1.4,0-2.5-1.1-2.5-2.5v-10c0-1.4,1.1-2.5,2.5-2.5h23c1.4,0,2.5,1.1,2.5,2.5v10	C60,29.9,58.9,31,57.5,31z"
                              />
                              <path
                                fill="#8AA3FF"
                                d="M59.8,61H12.2C8.8,61,6,58,6,54.4V17.6C6,14,8.8,11,12.2,11h18.5c1.7,0,3.3,1,4.1,2.6L38,24h21.8	c3.4,0,6.2,2.4,6.2,6v24.4C66,58,63.2,61,59.8,61z"
                              />
                              <path
                                display="none"
                                fill="#8AA3FF"
                                d="M62.1,61H9.9C7.8,61,6,59.2,6,57c0,0,0-31.5,0-42c0-2.2,1.8-4,3.9-4h19.3	c1.6,0,3.2,0.2,3.9,2.3l2.7,6.8c0.5,1.1,1.6,1.9,2.8,1.9h23.5c2.2,0,3.9,1.8,3.9,4v31C66,59.2,64.2,61,62.1,61z"
                              />
                              <path
                                fill="#798BFF"
                                d="M7.7,59c2.2,2.4,4.7,2,6.3,2h45c1.1,0,3.2,0.1,5.3-2H7.7z"
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <span className="title">DashLite Resource</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="nk-file-actions hideable">
                    <a href="#" className="btn btn-sm btn-icon btn-trigger">
                      <em className="icon ni ni-cross" />
                    </a>
                  </div>
                </div>
                <div className="nk-file-item nk-file">
                  <div className="nk-file-info">
                    <a href="#" className="nk-file-link">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              viewBox="0 0 72 72"
                            >
                              <path
                                fill="#6C87FE"
                                d="M57.5,31h-23c-1.4,0-2.5-1.1-2.5-2.5v-10c0-1.4,1.1-2.5,2.5-2.5h23c1.4,0,2.5,1.1,2.5,2.5v10	C60,29.9,58.9,31,57.5,31z"
                              />
                              <path
                                fill="#8AA3FF"
                                d="M59.8,61H12.2C8.8,61,6,58,6,54.4V17.6C6,14,8.8,11,12.2,11h18.5c1.7,0,3.3,1,4.1,2.6L38,24h21.8	c3.4,0,6.2,2.4,6.2,6v24.4C66,58,63.2,61,59.8,61z"
                              />
                              <path
                                display="none"
                                fill="#8AA3FF"
                                d="M62.1,61H9.9C7.8,61,6,59.2,6,57c0,0,0-31.5,0-42c0-2.2,1.8-4,3.9-4h19.3	c1.6,0,3.2,0.2,3.9,2.3l2.7,6.8c0.5,1.1,1.6,1.9,2.8,1.9h23.5c2.2,0,3.9,1.8,3.9,4v31C66,59.2,64.2,61,62.1,61z"
                              />
                              <path
                                fill="#798BFF"
                                d="M7.7,59c2.2,2.4,4.7,2,6.3,2h45c1.1,0,3.2,0.1,5.3-2H7.7z"
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <span className="title">Projects</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="nk-file-actions hideable">
                    <a href="#" className="btn btn-sm btn-icon btn-trigger">
                      <em className="icon ni ni-cross" />
                    </a>
                  </div>
                </div>
                <div className="nk-file-item nk-file">
                  <div className="nk-file-info">
                    <a href="#" className="nk-file-link">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <g>
                                <rect
                                  x={16}
                                  y={14}
                                  width={40}
                                  height={44}
                                  rx={6}
                                  ry={6}
                                  style={{ fill: "#7e95c4" }}
                                />
                                <rect
                                  x={32}
                                  y={17}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={32}
                                  y={22}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={32}
                                  y={27}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={32}
                                  y={32}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={32}
                                  y={37}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <path
                                  d="M35,14h2a0,0,0,0,1,0,0V43a1,1,0,0,1-1,1h0a1,1,0,0,1-1-1V14A0,0,0,0,1,35,14Z"
                                  style={{ fill: "#fff" }}
                                />
                                <path
                                  d="M38.0024,42H33.9976A1.9976,1.9976,0,0,0,32,43.9976v2.0047A1.9976,1.9976,0,0,0,33.9976,48h4.0047A1.9976,1.9976,0,0,0,40,46.0024V43.9976A1.9976,1.9976,0,0,0,38.0024,42Zm-.0053,4H34V44h4Z"
                                  style={{ fill: "#fff" }}
                                />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <span className="title">All work.zip</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="nk-file-actions hideable">
                    <a href="#" className="btn btn-sm btn-icon btn-trigger">
                      <em className="icon ni ni-cross" />
                    </a>
                  </div>
                </div>
                <div className="nk-file-item nk-file">
                  <div className="nk-file-info">
                    <a href="#" className="nk-file-link">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <path
                                d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z"
                                style={{ fill: "#36c684" }}
                              />
                              <path
                                d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z"
                                style={{ fill: "#95e5bd" }}
                              />
                              <path
                                d="M42,31H30a3.0033,3.0033,0,0,0-3,3V45a3.0033,3.0033,0,0,0,3,3H42a3.0033,3.0033,0,0,0,3-3V34A3.0033,3.0033,0,0,0,42,31ZM29,38h6v3H29Zm8,0h6v3H37Zm6-4v2H37V33h5A1.001,1.001,0,0,1,43,34ZM30,33h5v3H29V34A1.001,1.001,0,0,1,30,33ZM29,45V43h6v3H30A1.001,1.001,0,0,1,29,45Zm13,1H37V43h6v2A1.001,1.001,0,0,1,42,46Z"
                                style={{ fill: "#fff" }}
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <span className="title">Sales Reports.xlsx</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="nk-file-actions hideable">
                    <a href="#" className="btn btn-sm btn-icon btn-trigger">
                      <em className="icon ni ni-cross" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nk-fmg-listing nk-block">
          <div className="nk-block-head-xs">
            <div className="nk-block-between g-2">
              <div className="nk-block-head-content">
                <h6 className="nk-block-title title">Recent Files</h6>
              </div>
            </div>
          </div>
          <div
            className="toggle-expand-content expanded"
            data-content="recent-files"
          >
            <div className="nk-files nk-files-view-group">
              <div className="nk-files-head">
                <div className="nk-file-item">
                  <div className="nk-file-info">
                    <div className="dropdown">
                      <div
                        className="tb-head dropdown-toggle dropdown-indicator-caret"
                        data-bs-toggle="dropdown"
                      >
                        Last Opened
                      </div>
                      <div className="dropdown-menu dropdown-menu-xs">
                        <ul className="link-list-opt no-bdr">
                          <li>
                            <a className="active" href="#">
                              <span>Last Opened</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span>Name</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span>Size</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-actions">
                    <div className="dropdown">
                      <a
                        href
                        className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                        data-bs-toggle="dropdown"
                      >
                        <em className="icon ni ni-more-h" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <ul className="link-list-opt no-bdr">
                          <li>
                            <a href="#file-share" data-bs-toggle="modal">
                              <em className="icon ni ni-share" />
                              <span>Share</span>
                            </a>
                          </li>
                          <li>
                            <a href="#file-copy" data-bs-toggle="modal">
                              <em className="icon ni ni-copy" />
                              <span>Copy</span>
                            </a>
                          </li>
                          <li>
                            <a href="#file-move" data-bs-toggle="modal">
                              <em className="icon ni ni-forward-arrow" />
                              <span>Move</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="file-dl-toast">
                              <em className="icon ni ni-download" />
                              <span>Download</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <em className="icon ni ni-trash" />
                              <span>Delete</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nk-files-group">
                <h6 className="title">Folder</h6>
                <div className="nk-files-list">
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              viewBox="0 0 72 72"
                            >
                              <path
                                fill="#6C87FE"
                                d="M57.5,31h-23c-1.4,0-2.5-1.1-2.5-2.5v-10c0-1.4,1.1-2.5,2.5-2.5h23c1.4,0,2.5,1.1,2.5,2.5v10	C60,29.9,58.9,31,57.5,31z"
                              />
                              <path
                                fill="#8AA3FF"
                                d="M59.8,61H12.2C8.8,61,6,58,6,54.4V17.6C6,14,8.8,11,12.2,11h18.5c1.7,0,3.3,1,4.1,2.6L38,24h21.8	c3.4,0,6.2,2.4,6.2,6v24.4C66,58,63.2,61,59.8,61z"
                              />
                              <path
                                display="none"
                                fill="#8AA3FF"
                                d="M62.1,61H9.9C7.8,61,6,59.2,6,57c0,0,0-31.5,0-42c0-2.2,1.8-4,3.9-4h19.3	c1.6,0,3.2,0.2,3.9,2.3l2.7,6.8c0.5,1.1,1.6,1.9,2.8,1.9h23.5c2.2,0,3.9,1.8,3.9,4v31C66,59.2,64.2,61,62.1,61z"
                              />
                              <path
                                fill="#798BFF"
                                d="M7.7,59c2.2,2.4,4.7,2,6.3,2h45c1.1,0,3.2,0.1,5.3-2H7.7z"
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              UI Design
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">Today</li>
                        <li className="size">4.5 MB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              viewBox="0 0 72 72"
                            >
                              <path
                                fill="#6C87FE"
                                d="M57.5,31h-23c-1.4,0-2.5-1.1-2.5-2.5v-10c0-1.4,1.1-2.5,2.5-2.5h23c1.4,0,2.5,1.1,2.5,2.5v10	C60,29.9,58.9,31,57.5,31z"
                              />
                              <path
                                fill="#8AA3FF"
                                d="M59.8,61H12.2C8.8,61,6,58,6,54.4V17.6C6,14,8.8,11,12.2,11h18.5c1.7,0,3.3,1,4.1,2.6L38,24h21.8	c3.4,0,6.2,2.4,6.2,6v24.4C66,58,63.2,61,59.8,61z"
                              />
                              <path
                                display="none"
                                fill="#8AA3FF"
                                d="M62.1,61H9.9C7.8,61,6,59.2,6,57c0,0,0-31.5,0-42c0-2.2,1.8-4,3.9-4h19.3	c1.6,0,3.2,0.2,3.9,2.3l2.7,6.8c0.5,1.1,1.6,1.9,2.8,1.9h23.5c2.2,0,3.9,1.8,3.9,4v31C66,59.2,64.2,61,62.1,61z"
                              />
                              <path
                                fill="#798BFF"
                                d="M7.7,59c2.2,2.4,4.7,2,6.3,2h45c1.1,0,3.2,0.1,5.3-2H7.7z"
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              Proposal
                            </a>
                            <div className="asterisk">
                              <a href="#" className="active">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">Today</li>
                        <li className="size">4.5 MB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <g>
                                <rect
                                  x={32}
                                  y={16}
                                  width={28}
                                  height={15}
                                  rx="2.5"
                                  ry="2.5"
                                  style={{ fill: "#6c87fe" }}
                                />
                                <path
                                  d="M59.7778,61H12.2222A6.4215,6.4215,0,0,1,6,54.3962V17.6038A6.4215,6.4215,0,0,1,12.2222,11H30.6977a4.6714,4.6714,0,0,1,4.1128,2.5644L38,24H59.7778A5.91,5.91,0,0,1,66,30V54.3962A6.4215,6.4215,0,0,1,59.7778,61Z"
                                  style={{ fill: "#8aa3ff" }}
                                />
                                <path
                                  d="M7.7454,58.9807C9.9352,61.3864,12.4882,61.0163,14,61H59a6.3373,6.3373,0,0,0,5.2562-2.0193Z"
                                  style={{ fill: "#798bff" }}
                                />
                                <path
                                  d="M29.6309,37.36a3.0236,3.0236,0,0,1-.86-2.39A4.3748,4.3748,0,0,1,32.9961,31h.0078a4.36,4.36,0,0,1,4.22,3.9121,3.0532,3.0532,0,0,1-.8545,2.4482A4.4158,4.4158,0,0,1,33.23,38.53c-.0771,0-.1533-.002-.23-.0049A4.519,4.519,0,0,1,29.6309,37.36Zm13.8359,2.7549a1,1,0,1,0-.9336,1.77c.7207.38,1.4658,2.126,1.4668,4.39V48a1,1,0,0,0,2,0V46.2744C45.999,43.3447,45.0049,40.9268,43.4668,40.1152ZM40.165,37.3965c-.1445.084-.29.168-.4316.2549a1,1,0,0,0,.5215,1.8535.9887.9887,0,0,0,.52-.1465c.1289-.0781.2607-.1543.3916-.23a4.2311,4.2311,0,0,0,2.1465-2.124.9839.9839,0,0,0,.0313-.1045A3.8411,3.8411,0,0,0,40.5,32.5352a1,1,0,0,0-.4922,1.9395,1.8773,1.8773,0,0,1,1.4,1.9092A2.835,2.835,0,0,1,40.165,37.3965ZM36.5,41h-7c-2.5234,0-4.5,2.7822-4.5,6.333V48.5a.8355.8355,0,0,0,.0588.2914.9731.9731,0,0,0,.3508.4946C26.4646,50.2812,29.4614,51,33,51s6.5353-.7187,7.59-1.7139a.9726.9726,0,0,0,.3509-.4949A.8361.8361,0,0,0,41,48.5V47.333C41,43.7822,39.0234,41,36.5,41Z"
                                  style={{ fill: "#4b66bc" }}
                                />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              Projects
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">Yesterday</li>
                        <li className="size">235 KB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              viewBox="0 0 72 72"
                            >
                              <path
                                fill="#6C87FE"
                                d="M57.5,31h-23c-1.4,0-2.5-1.1-2.5-2.5v-10c0-1.4,1.1-2.5,2.5-2.5h23c1.4,0,2.5,1.1,2.5,2.5v10	C60,29.9,58.9,31,57.5,31z"
                              />
                              <path
                                fill="#8AA3FF"
                                d="M59.8,61H12.2C8.8,61,6,58,6,54.4V17.6C6,14,8.8,11,12.2,11h18.5c1.7,0,3.3,1,4.1,2.6L38,24h21.8	c3.4,0,6.2,2.4,6.2,6v24.4C66,58,63.2,61,59.8,61z"
                              />
                              <path
                                display="none"
                                fill="#8AA3FF"
                                d="M62.1,61H9.9C7.8,61,6,59.2,6,57c0,0,0-31.5,0-42c0-2.2,1.8-4,3.9-4h19.3	c1.6,0,3.2,0.2,3.9,2.3l2.7,6.8c0.5,1.1,1.6,1.9,2.8,1.9h23.5c2.2,0,3.9,1.8,3.9,4v31C66,59.2,64.2,61,62.1,61z"
                              />
                              <path
                                fill="#798BFF"
                                d="M7.7,59c2.2,2.4,4.7,2,6.3,2h45c1.1,0,3.2,0.1,5.3-2H7.7z"
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              2019 Projects
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">03 May</li>
                        <li className="size">235 KB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nk-files-group">
                <h6 className="title">Files</h6>
                <div className="nk-files-list">
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <path
                                d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z"
                                style={{ fill: "#36c684" }}
                              />
                              <path
                                d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z"
                                style={{ fill: "#95e5bd" }}
                              />
                              <path
                                d="M42,31H30a3.0033,3.0033,0,0,0-3,3V45a3.0033,3.0033,0,0,0,3,3H42a3.0033,3.0033,0,0,0,3-3V34A3.0033,3.0033,0,0,0,42,31ZM29,38h6v3H29Zm8,0h6v3H37Zm6-4v2H37V33h5A1.001,1.001,0,0,1,43,34ZM30,33h5v3H29V34A1.001,1.001,0,0,1,30,33ZM29,45V43h6v3H30A1.001,1.001,0,0,1,29,45Zm13,1H37V43h6v2A1.001,1.001,0,0,1,42,46Z"
                                style={{ fill: "#fff" }}
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              Update Data.xlsx
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">Yesterday</li>
                        <li className="size">235 KB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <g>
                                <rect
                                  x={16}
                                  y={14}
                                  width={40}
                                  height={44}
                                  rx={6}
                                  ry={6}
                                  style={{ fill: "#7e95c4" }}
                                />
                                <rect
                                  x={32}
                                  y={17}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={32}
                                  y={22}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={32}
                                  y={27}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={32}
                                  y={32}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={32}
                                  y={37}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <path
                                  d="M35,14h2a0,0,0,0,1,0,0V43a1,1,0,0,1-1,1h0a1,1,0,0,1-1-1V14A0,0,0,0,1,35,14Z"
                                  style={{ fill: "#fff" }}
                                />
                                <path
                                  d="M38.0024,42H33.9976A1.9976,1.9976,0,0,0,32,43.9976v2.0047A1.9976,1.9976,0,0,0,33.9976,48h4.0047A1.9976,1.9976,0,0,0,40,46.0024V43.9976A1.9976,1.9976,0,0,0,38.0024,42Zm-.0053,4H34V44h4Z"
                                  style={{ fill: "#fff" }}
                                />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              dashlite...1.2.zip
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">03 May</li>
                        <li className="size">235 KB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <g>
                                <rect
                                  x={16}
                                  y={14}
                                  width={40}
                                  height={44}
                                  rx={6}
                                  ry={6}
                                  style={{ fill: "#7e95c4" }}
                                />
                                <rect
                                  x={32}
                                  y={17}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={32}
                                  y={22}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={32}
                                  y={27}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={32}
                                  y={32}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={32}
                                  y={37}
                                  width={8}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <path
                                  d="M35,14h2a0,0,0,0,1,0,0V43a1,1,0,0,1-1,1h0a1,1,0,0,1-1-1V14A0,0,0,0,1,35,14Z"
                                  style={{ fill: "#fff" }}
                                />
                                <path
                                  d="M38.0024,42H33.9976A1.9976,1.9976,0,0,0,32,43.9976v2.0047A1.9976,1.9976,0,0,0,33.9976,48h4.0047A1.9976,1.9976,0,0,0,40,46.0024V43.9976A1.9976,1.9976,0,0,0,38.0024,42Zm-.0053,4H34V44h4Z"
                                  style={{ fill: "#fff" }}
                                />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              covstats...1.0.zip
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">01 May</li>
                        <li className="size">235 KB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <g>
                                <path
                                  d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z"
                                  style={{ fill: "#599def" }}
                                />
                                <path
                                  d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z"
                                  style={{ fill: "#c2e1ff" }}
                                />
                                <rect
                                  x={27}
                                  y={31}
                                  width={18}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={27}
                                  y={36}
                                  width={18}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={27}
                                  y={41}
                                  width={18}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={27}
                                  y={46}
                                  width={12}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              Price-Update.doc
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">25 Apr</li>
                        <li className="size">23 MB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <g>
                                <path
                                  d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z"
                                  style={{ fill: "#599def" }}
                                />
                                <path
                                  d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z"
                                  style={{ fill: "#c2e1ff" }}
                                />
                                <rect
                                  x={27}
                                  y={31}
                                  width={18}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={27}
                                  y={36}
                                  width={18}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={27}
                                  y={41}
                                  width={18}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                                <rect
                                  x={27}
                                  y={46}
                                  width={12}
                                  height={2}
                                  rx={1}
                                  ry={1}
                                  style={{ fill: "#fff" }}
                                />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              Quotation.doc
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">06 Apr</li>
                        <li className="size">23 MB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <path
                                d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z"
                                style={{ fill: "#7e95c4" }}
                              />
                              <path
                                d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z"
                                style={{ fill: "#b7ccea" }}
                              />
                              <rect
                                x={27}
                                y={31}
                                width={18}
                                height={2}
                                rx={1}
                                ry={1}
                                style={{ fill: "#fff" }}
                              />
                              <rect
                                x={27}
                                y={35}
                                width={18}
                                height={2}
                                rx={1}
                                ry={1}
                                style={{ fill: "#fff" }}
                              />
                              <rect
                                x={27}
                                y={39}
                                width={18}
                                height={2}
                                rx={1}
                                ry={1}
                                style={{ fill: "#fff" }}
                              />
                              <rect
                                x={27}
                                y={43}
                                width={14}
                                height={2}
                                rx={1}
                                ry={1}
                                style={{ fill: "#fff" }}
                              />
                              <rect
                                x={27}
                                y={47}
                                width={8}
                                height={2}
                                rx={1}
                                ry={1}
                                style={{ fill: "#fff" }}
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              Work-to-do.txt
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">02 Apr</li>
                        <li className="size">23 MB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <path
                                d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z"
                                style={{ fill: "#755de0" }}
                              />
                              <path
                                d="M27.2223,43H44.7086s2.325-.2815.7357-1.897l-5.6034-5.4985s-1.5115-1.7913-3.3357.7933L33.56,40.4707a.6887.6887,0,0,1-1.0186.0486l-1.9-1.6393s-1.3291-1.5866-2.4758,0c-.6561.9079-2.0261,2.8489-2.0261,2.8489S25.4268,43,27.2223,43Z"
                                style={{ fill: "#fff" }}
                              />
                              <path
                                d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z"
                                style={{ fill: "#b5b3ff" }}
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              DashLite_Crypto_v1.psd
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">02 Apr</li>
                        <li className="size">23 MB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <path
                                d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z"
                                style={{ fill: "#f74141" }}
                              />
                              <path
                                d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z"
                                style={{ fill: "#ffa9a9" }}
                              />
                              <path
                                d="M46,46.5v-13A3.5042,3.5042,0,0,0,42.5,30h-13A3.5042,3.5042,0,0,0,26,33.5v13A3.5042,3.5042,0,0,0,29.5,50h13A3.5042,3.5042,0,0,0,46,46.5ZM40,45v3H37V45Zm-3-2V37h7v6Zm0-8V32h3v3Zm-2-3v3H32V32Zm0,5v6H28V37Zm0,8v3H32V45Zm7.5,3H42V45h2v1.5A1.5016,1.5016,0,0,1,42.5,48ZM44,33.5V35H42V32h.5A1.5016,1.5016,0,0,1,44,33.5ZM29.5,32H30v3H28V33.5A1.5016,1.5016,0,0,1,29.5,32ZM28,46.5V45h2v3h-.5A1.5016,1.5016,0,0,1,28,46.5Z"
                                style={{ fill: "#fff" }}
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              New Movie 2020.mp4
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">02 Apr</li>
                        <li className="size">23 MB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <path
                                d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z"
                                style={{ fill: "#36c684" }}
                              />
                              <path
                                d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z"
                                style={{ fill: "#95e5bd" }}
                              />
                              <path
                                d="M42,31H30a3.0033,3.0033,0,0,0-3,3V45a3.0033,3.0033,0,0,0,3,3H42a3.0033,3.0033,0,0,0,3-3V34A3.0033,3.0033,0,0,0,42,31ZM29,38h6v3H29Zm8,0h6v3H37Zm6-4v2H37V33h5A1.001,1.001,0,0,1,43,34ZM30,33h5v3H29V34A1.001,1.001,0,0,1,30,33ZM29,45V43h6v3H30A1.001,1.001,0,0,1,29,45Zm13,1H37V43h6v2A1.001,1.001,0,0,1,42,46Z"
                                style={{ fill: "#fff" }}
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              Project Access.xls
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">02 Apr</li>
                        <li className="size">23 MB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-file-item nk-file">
                    <div className="nk-file-info">
                      <div className="nk-file-title">
                        <div className="nk-file-icon">
                          <span className="nk-file-icon-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 72 72"
                            >
                              <path
                                d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z"
                                style={{ fill: "#f25168" }}
                              />
                              <path
                                d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z"
                                style={{ fill: "#ff9fb6" }}
                              />
                              <path
                                d="M44.1405,46H27.8595A1.86,1.86,0,0,1,26,44.1405V34.8595A1.86,1.86,0,0,1,27.8595,33H44.14A1.86,1.86,0,0,1,46,34.86v9.2808A1.86,1.86,0,0,1,44.1405,46ZM29.1454,44H42.8546A1.1454,1.1454,0,0,0,44,42.8546V36.1454A1.1454,1.1454,0,0,0,42.8546,35H29.1454A1.1454,1.1454,0,0,0,28,36.1454v6.7093A1.1454,1.1454,0,0,0,29.1454,44Z"
                                style={{ fill: "#fff" }}
                              />
                              <path
                                d="M36.4218,34.268a.7112.7112,0,0,1-.5048-.2093l-2.1431-2.1428a.7143.7143,0,0,1,1.01-1.01l2.1428,2.1431a.7142.7142,0,0,1-.5051,1.2192Z"
                                style={{ fill: "#fff" }}
                              />
                              <path
                                d="M36.4218,34.268a.7142.7142,0,0,1-.5048-1.2192L38.06,30.9057a.7141.7141,0,0,1,1.01,1.01l-2.1426,2.1428A.7113.7113,0,0,1,36.4218,34.268Z"
                                style={{ fill: "#fff" }}
                              />
                              <path
                                d="M32.1356,49.268a.7054.7054,0,0,1-.3665-.102.7145.7145,0,0,1-.2451-.98l2.1431-3.5713a.7142.7142,0,0,1,1.2247.735l-2.1426,3.5711A.7144.7144,0,0,1,32.1356,49.268Z"
                                style={{ fill: "#fff" }}
                              />
                              <path
                                d="M40.7083,49.268a.7138.7138,0,0,1-.6129-.3463L37.9526,45.35a.7143.7143,0,0,1,1.225-.735L41.32,48.1866a.7137.7137,0,0,1-.6121,1.0814Z"
                                style={{ fill: "#fff" }}
                              />
                              <path
                                d="M35.12,37H30.9a.5007.5007,0,1,1,0-1h4.22a.5007.5007,0,1,1,0,1Z"
                                style={{ fill: "#fff" }}
                              />
                              <path
                                d="M41.9758,43H37.5471a.5056.5056,0,1,1,0-1.0065h4.4286a.5056.5056,0,1,1,0,1.0065Z"
                                style={{ fill: "#fff" }}
                              />
                              <path
                                d="M38.14,40H33.9775a.5.5,0,1,1,0-1H38.14a.5.5,0,1,1,0,1Z"
                                style={{ fill: "#fff" }}
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="nk-file-name">
                          <div className="nk-file-name-text">
                            <a href="#" className="title">
                              2019 Presentation.ppt
                            </a>
                            <div className="asterisk">
                              <a href="#">
                                <em className="asterisk-off icon ni ni-star" />
                                <em className="asterisk-on icon ni ni-star-fill" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nk-file-desc">
                        <li className="date">02 Apr</li>
                        <li className="size">23 MB</li>
                        <li className="members">3 Members</li>
                      </ul>
                    </div>
                    <div className="nk-file-actions">
                      <div className="dropdown">
                        <a
                          href
                          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-plain no-bdr">
                            <li>
                              <a href="#file-details" data-bs-toggle="modal">
                                <em className="icon ni ni-eye" />
                                <span>Details</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-share" data-bs-toggle="modal">
                                <em className="icon ni ni-share" />
                                <span>Share</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-copy" data-bs-toggle="modal">
                                <em className="icon ni ni-copy" />
                                <span>Copy</span>
                              </a>
                            </li>
                            <li>
                              <a href="#file-move" data-bs-toggle="modal">
                                <em className="icon ni ni-forward-arrow" />
                                <span>Move</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="file-dl-toast">
                                <em className="icon ni ni-download" />
                                <span>Download</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-pen" />
                                <span>Rename</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-trash" />
                                <span>Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
