import { useEffect } from "react";

export const ConfirmDeleteModal = ({ onClose, onConfirm, title }) => {
  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");
    overlay?.classList.add("show");
    return () => overlay?.classList.remove("show");
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
            <h5 className="modal-title">Confirm</h5>
            <a href="#" className="close" onClick={onClose}>
              <em className="icon ni ni-cross" />
            </a>
          </div>
          <div className="modal-body">
            <p>{title}</p>
          </div>
          <div className="modal-footer bg-light">
            <button className="btn btn-danger" onClick={onConfirm}>
              Delete
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
