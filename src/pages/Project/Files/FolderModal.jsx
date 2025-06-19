import { useEffect, useState } from "react";
import {
  useLazyCreateFolderQuery,
  useLazyUpdateFolderQuery,
} from "../../../store/files/files.api";
import { toast } from "react-toastify";
import { useAppSelect } from "../../../hooks/redux";

export const FolderModal = ({ onClose, parentId, editData, onRefetchData, nameFolder}) => {
  const [folderData, setFolderData] = useState({
    folder_name: "",
  });
  const [createFolder] = useLazyCreateFolderQuery();
  const [updateFolder] = useLazyUpdateFolderQuery();
  const [loading, setLoading] = useState(false);
  const { selectedProject } = useAppSelect((state) => state.auth);

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");
    overlay?.classList.add("show");
    return () => overlay?.classList.remove("show");
  }, []);

  useEffect(() => {
    if (editData) {
      setFolderData({ folder_name: editData?.full_name, folder_id: editData?.id });
    }
  }, []);

  const handleSubmit = () => {
    if (editData) {
      updateFolder({ ...folderData, new_name: folderData?.folder_name }).then(
        (resp) => {
          setLoading(false);
          if (resp.isSuccess) {
            onClose();
            onRefetchData();
            toast.success("Успешно сохранено");
          } else {
            toast.error("Ошибка");
          }
        }
      );
    } else {
      createFolder({
        project_id: selectedProject,
        parent_id: parentId,
        folder_name: folderData.folder_name,
      }).then((resp) => {
        setLoading(false);
        if (resp.isSuccess) {
          onClose();
          onRefetchData();
          toast.success("Успешно сохранено");
        } else {
          toast.error("Ошибка");
        }
      });
    }
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
            <h5 className="modal-title">
              {editData ? "Rename" : "Create"} Folder
            </h5>
            <div href="#" className="close" onClick={onClose}>
              <em className="icon ni ni-cross" />
            </div>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Folder Name</label>
              <input
                type="text"
                className="form-control"
                value={folderData.folder_name}
                onChange={(e) =>
                  setFolderData({ ...folderData, folder_name: e.target.value })
                }
              />
            </div>
            {/* 
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
            </div> */}
          </div>

          <div className="modal-footer bg-light">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleSubmit();
              }}
              disabled={folderData?.folder_name?.length === 0 || loading}
            >
              {editData ? "Save" : "Create"}
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
