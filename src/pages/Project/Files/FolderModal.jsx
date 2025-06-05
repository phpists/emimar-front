import { useEffect, useState } from "react";

export const FolderModal = ({ onClose }) => {
  const [folderData, setFolderData] = useState({
    name: "",
    assignedUsers: [],
  });

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");
    overlay?.classList.add("show");
    return () => overlay?.classList.remove("show");
  }, []);

  const handleUserChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFolderData({ ...folderData, assignedUsers: selectedOptions });
  };

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
            <h5 className="modal-title">Create Folder</h5>
            <a href="#" className="close" onClick={onClose}>
              <em className="icon ni ni-cross" />
            </a>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Folder Name</label>
              <input
                type="text"
                className="form-control"
                value={folderData.name}
                onChange={(e) =>
                  setFolderData({ ...folderData, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Assign Users</label>
              <select
                multiple
                className="form-control"
                value={folderData.assignedUsers}
                onChange={handleUserChange}
              >
                <option value="1">Alice Johnson</option>
                <option value="2">Bob Smith</option>
                <option value="3">Charlie Brown</option>
                <option value="4">Diana Prince</option>
              </select>
              <small className="text-muted"></small>
            </div>
          </div>

          <div className="modal-footer bg-light">
            <button
              className="btn btn-primary"
              onClick={() => {
                console.log("Folder data:", folderData);
                onClose();
              }}
            >
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
