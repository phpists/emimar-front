import { useEffect, useState } from "react";
import { getFileIcon } from "../../../helpers";
import { useLazyUploadFileQuery } from "../../../store/files/files.api";
import { useAppSelect } from "../../../hooks/redux";
import { toast } from "react-toastify";

export const UploadModal = ({ onClose, parentId, onRefetchData }) => {
  const [files, setFiles] = useState([]);
  const [uploadFile] = useLazyUploadFileQuery();
  const { selectedProject } = useAppSelect((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");

    overlay?.classList.add("show");

    return () => {
      overlay?.classList.remove("show");
    };
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (selectedFiles) => {
    selectedFiles?.forEach((file) => {
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

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleRemove = (index) => {
    setFiles((prev) => prev.filter((file, i) => i !== index));
  };

  const handleSubmit = () => {
    setLoading(true);
    Promise.all(
      files.map(({ file }) => {
        const data = new FormData();
        data.append("project_id", selectedProject);
        data.append("parent_id", parentId);
        data.append("file", file);
        return uploadFile(data).then((resp) => {
          if (!resp.isSuccess) {
            toast.error("Error uploading file");
            throw new Error("Upload failed");
          }
          return resp;
        });
      })
    )
      .then(() => {
        toast.success("Files uploaded successfully");
        onClose();
        setTimeout(onRefetchData, 600);
      })
      .catch(() => {
        toast.error("Some files failed to upload");
      })
      .finally(() => {
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

                <div 
                  className={`upload-zone small bg-lighter dropzone dz-clickable ${isDragging ? 'dragging' : ''}`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
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
                      disabled={files?.length === 0 || loading}
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
