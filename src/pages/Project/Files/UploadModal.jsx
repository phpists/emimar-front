import { useEffect } from "react";

export const UploadModal = ({ onClose }) => {
  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");

    overlay.classList.add("show");

    return () => overlay.classList.remove("show");
  }, []);

  return (
    <>
      <div
        className="modal fade show"
        tabIndex={-1}
        id="file-upload"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <a
              href="#"
              className="close"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              <em className="icon ni ni-cross-sm" />
            </a>
            <div className="modal-body modal-body-md">
              <div className="nk-upload-form">
                <h5 className="title mb-3">Upload File</h5>
                <div className="upload-zone small bg-lighter dropzone dz-clickable">
                  <div className="dz-message" data-dz-message>
                    <span className="dz-message-text">
                      <span>Drag and drop</span> file here or
                      <span>browse</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="nk-upload-list">
                <h6 className="title">Uploaded Files</h6>
                <div className="nk-upload-item">
                  <div className="nk-upload-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
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
                  </div>
                  <div className="nk-upload-info">
                    <div className="nk-upload-title">
                      <span className="title">dashlite-latest-version.zip</span>
                    </div>
                    <div className="nk-upload-size">25.49 MB</div>
                  </div>
                  <div className="nk-upload-action">
                    <a
                      href="#"
                      className="btn btn-icon btn-trigger"
                      data-bs-dismiss="modal"
                    >
                      <em className="icon ni ni-trash" />
                    </a>
                  </div>
                </div>
                <div className="nk-upload-item">
                  <div className="nk-upload-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
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
                  </div>
                  <div className="nk-upload-info">
                    <div className="nk-upload-title">
                      <span className="title">Update work history.docx</span>
                      <span className="meta">70% Done</span>
                    </div>
                    <div className="nk-upload-progress">
                      <div className="progress progress-sm">
                        <div
                          className="progress-bar"
                          data-progress={70}
                          style={{ width: "70%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="nk-upload-action">
                    <a
                      href="#"
                      className="btn btn-icon btn-trigger"
                      data-bs-dismiss="modal"
                    >
                      <em className="icon ni ni-trash" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="nk-modal-action justify-end">
                <ul className="btn-toolbar g-4 align-center">
                  <li>
                    <a href="#" className="link link-primary">
                      Cancel
                    </a>
                  </li>
                  <li>
                    <button className="btn btn-primary">Add Files</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
