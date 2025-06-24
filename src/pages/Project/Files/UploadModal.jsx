import { useEffect, useState } from "react";
import { getFileIcon } from "../../../helpers";
import { useUploadFilesMutation} from "../../../store/files/files.api";
import { useAppSelect } from "../../../hooks/redux";
import {toast} from "react-toastify";

export const UploadModal = ({ onClose, parentId, onRefetchData }) => {
  const [files, setFiles] = useState([]);
  const [uploadFiles] = useUploadFilesMutation();
  const { selectedProject } = useAppSelect((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");

    overlay?.classList.add("show");

    return () => {
      overlay?.classList.remove("show");
    };
  }, []);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (files.length + selectedFiles.length > 10) {
      toast.error("Максимум 10 файлів!");
      return;
    }

    selectedFiles.forEach((file) => {
      const newFile = { name: file.name, progress: 0, file };
      setFiles((prev) => [...prev, newFile]);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles((prev) =>
            prev.map((f) => (f.name === file.name ? { ...f, progress } : f))
        );
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);
    });
  };

  const handleRemove = (index) => {
    setFiles((prev) => prev.filter((file, i) => i !== index));
  };

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("project_id", selectedProject);
    formData.append("parent_id", parentId);

    files.forEach(({ file }) => {
      formData.append("files[]", file);
    });

    uploadFiles(formData).unwrap().then(() => {
      onClose();
      setTimeout(onRefetchData, 600);
      toast.success("Успешно сохранено");
    }).catch(() => {
      toast.error("Ошибка");
    }).finally(() => {
      setLoading(false);
    });
  };

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
            <div
              aria-label="Close"
              className="close"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              <em className="icon ni ni-cross-sm" />
            </div>
            <div className="modal-body modal-body-md">
              <div className="nk-upload-form">
                <h5 className="title mb-3">Upload File</h5>

                <div className="upload-zone small bg-lighter dropzone dz-clickable">
                  {" "}
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.gif,.svg,.webp,.xls,.xlsx,.xlsm,.xlsb,.doc,.docx,.rtf,.txt,.pdf,.zip,.rar,.7z,.dwg,.ifc,.dxf,.pln,.bimx,.edoc"
                    onChange={handleFileSelect}
                    value=""
                  />
                  <div className="dz-message" data-dz-message>
                    <span className="dz-message-text">
                      <span>Drag and drop</span> files here or
                      <span>browse</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="nk-upload-list">
                <h6 className="title">Uploaded Files</h6>
                {files.length === 0 && <div>No files uploaded</div>}
                {files?.map((file, index) => (
                  <div key={index} className="nk-upload-item">
                    {" "}
                    <div className="nk-upload-icon">
                      {getFileIcon(file?.name?.split(".")?.pop())}
                    </div>
                    <div className="nk-upload-info">
                      <div className="nk-upload-title">
                        <span className="title">{file.name}</span>
                        {file.progress < 100 && (
                          <span className="meta">{file.progress}% Done</span>
                        )}

                        {file.progress === 100 && (
                          <span className="meta"> Uploaded </span>
                        )}
                      </div>
                      {file.progress < 100 && (
                        <div className="nk-upload-progress">
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="nk-upload-action">
                      <a
                        href="#"
                        className="btn btn-icon btn-trigger"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemove(index);
                        }}
                      >
                        <em className="icon ni ni-trash" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="nk-modal-action justify-end">
                <ul className="btn-toolbar g-4 align-center">
                  <li>
                    <a href="#" className="link link-primary" onClick={onClose}>
                      Cancel
                    </a>
                  </li>
                  <li>
                    <button
                      htmlFor="file"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                      disabled={files?.length === 0 || loading || files.length > 10}
                    >
                      Add Files
                    </button>
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
