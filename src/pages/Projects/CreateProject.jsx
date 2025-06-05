import { useEffect, useState } from "react";

export const CreateProject = ({ onClose }) => {
  const [selectionType, setSelectionType] = useState("users");

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");
    overlay?.classList.add("show");
    return () => overlay?.classList.remove("show");
  }, []);

  return (
    <div
      className="modal fade show"
      tabIndex={-1}
      id="modalCreateProject"
      aria-modal="true"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Project</h5>
            <a href="#" className="close" onClick={onClose} aria-label="Close">
              <em className="icon ni ni-cross" />
            </a>
          </div>

          <div className="modal-body">
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="project-name">
                  Project Name
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    id="project-name"
                    placeholder="Enter project name"
                  />
                </div>
              </div>

              {/* Toggle Buttons */}
              <div className="form-group">
                <label className="form-label">Assign to:</label>
                <div className="d-flex gap-2 mb-2">
                  <button
                    type="button"
                    className={`btn p-2 btn-sm ${
                      selectionType === "users"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setSelectionType("users")}
                  >
                    Users
                  </button>
                  <button
                    type="button"
                    className={`btn p-2 btn-sm ${
                      selectionType === "groups"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setSelectionType("groups")}
                  >
                    Groups
                  </button>
                </div>
              </div>

              {/* Conditional Select */}
              <div className="form-group">
                <label className="form-label">
                  {selectionType === "users" ? "Assign Users" : "Assign Groups"}
                </label>
                <div className="form-control-wrap">
                  <select className="form-select" multiple>
                    {selectionType === "users" ? (
                      <>
                        <option value="1">Alice Johnson</option>
                        <option value="2">Bob Smith</option>
                        <option value="3">Charlie Brown</option>
                        <option value="4">Diana Prince</option>
                      </>
                    ) : (
                      <>
                        <option value="g1">Frontend Team</option>
                        <option value="g2">Backend Team</option>
                        <option value="g3">QA Engineers</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer bg-light">
            <button type="button" className="btn btn-primary">
              Create
            </button>
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
