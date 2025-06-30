import {useEffect, useRef, useState} from "react";
import {
  useLazyCreateFolderQuery,
  useLazyUpdateFolderQuery,
} from "../../../store/files/files.api";
import { toast } from "react-toastify";
import { useAppSelect } from "../../../hooks/redux";

const presetOptions = [
  "Сделка M | Deal M Nr. ",
  "Сделка D | Deal D Nr. ",
  "Заказ | Order Nr. "
];

export const FolderModal = ({ isOpen, onClose, parentId, editData, onRefetchData }) => {
  const [folderData, setFolderData] = useState({
    folder_name: "",
  });
  const [createFolder] = useLazyCreateFolderQuery();
  const [updateFolder] = useLazyUpdateFolderQuery();
  const [loading, setLoading] = useState(false);
  const { selectedProject } = useAppSelect((state) => state.auth);
  const inputRef = useRef(null);

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");
    overlay?.classList.add("show");
    return () => overlay?.classList.remove("show");
  }, []);

  useEffect(() => {
    if (!isOpen) setFolderData("");
  }, [isOpen]);

  const handlePresetSelect = (e) => {
    const value = e.target.value;
    setFolderData((prev) => ({ ...prev, folder_name: value }));
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (editData) {
      setFolderData({ folder_name: editData?.name, folder_id: editData?.id });
    }
  }, [editData]);

  const handleChange = (e) => {
    const value = e.target.value;
    setFolderData((prev) => ({ ...prev, folder_name: value }));
  };

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
              {editData ? "Edit" : "Create"} Folder
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
                  ref={inputRef}
                  className="form-control"
                  value={folderData.folder_name}
                  onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="preset" className="form-label">
                Select Folder Name Template
              </label>
              <select
                  id="preset"
                  className="form-select"
                  onChange={handlePresetSelect}
                  defaultValue=""
                  style={{ cursor: "pointer" }}
              >
                <option value="" disabled>
                  Choose a template
                </option>
                {presetOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                ))}
              </select>
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
