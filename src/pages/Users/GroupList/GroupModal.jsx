import { useEffect, useState } from "react";

export const GroupModal = ({ onClose }) => {
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");

    overlay.classList.add("show");

    return () => overlay.classList.remove("show");
  }, []);

  return (
    <div
      className="modal fade show"
      tabIndex={-1}
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Group</h5>
            <a href="#" className="close" onClick={onClose}>
              <em className="icon ni ni-cross" />
            </a>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="project-users">
                Assign Users
              </label>
              <div className="form-control-wrap">
                <select
                  id="project-users"
                  className="form-select js-select2"
                  multiple
                >
                  <option value="1">Alice Johnson</option>
                  <option value="2">Bob Smith</option>
                  <option value="3">Charlie Brown</option>
                  <option value="4">Diana Prince</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer bg-light">
            <button className="btn btn-primary" onClick={onClose}>
              Create
            </button>
            <button className="btn btn-light" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
