import { formatFileSize, getFileIcon } from "../../helpers";
import { Actions } from "./Actions";
import { TYPES } from "./types";

export const FileCard = ({
  type,
  name,
  date,
  size,
  onEdit,
  onDelete,
  onSelect,
  id,
  onFileDrop,
  onViewFile,
}) => {
  const isDraggable = type !== "folder";
  const isDroppable = type === "folder";

  const handleDragStart = (e) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ id, type }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (isDroppable) {
      e.currentTarget.classList.add('nk-file-dragover');
    }
  };

  const handleDragEnter = (e) => {
    if (isDroppable) {
      e.currentTarget.classList.add('nk-file-dragover');
    }
  };

  const handleDragLeave = (e) => {
    if (isDroppable) {
      e.currentTarget.classList.remove('nk-file-dragover');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isDroppable) {
      e.currentTarget.classList.remove('nk-file-dragover');
      const draggedData = JSON.parse(e.dataTransfer.getData("application/json"));

      if (draggedData.type !== "folder") {
        onFileDrop && onFileDrop(draggedData.id, id);
      }
    }
  };

  return (
    <div
      className={`nk-file-item nk-file ${onSelect && "cursor-pointer"}`}
      draggable={isDraggable}
      onDragStart={isDraggable ? handleDragStart : null}
      onDragOver={isDroppable ? handleDragOver : null}
      onDragEnter={isDroppable ? handleDragEnter : null}
      onDragLeave={isDroppable ? handleDragLeave : null}
      onDrop={isDroppable ? handleDrop : null}
      onClick={(e) => {
        e.preventDefault();
        onSelect && onSelect();
      }}
    >
      <div className="nk-file-info">
        <div className="nk-file-title">
          <div className="nk-file-icon">
            <span className="nk-file-icon-type">{getFileIcon(type)}</span>
          </div>
          <div className="nk-file-name">
            <div className="nk-file-name-text">
              <a
                href="#"
                className="title"
                onClick={(e) => {
                  e.preventDefault();
                  if (type === "folder") {
                    onSelect && onSelect();
                  } else {
                    onViewFile && onViewFile(id);
                  }
                }}
              >
                {name}
              </a>
            </div>
          </div>
        </div>
        <ul className="nk-file-desc">
          <li className="date">{new Date(date)?.toLocaleDateString()}</li>
          {size ? <li className="size">{formatFileSize(size)}</li> : null}
        </ul>
      </div>
      <Actions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};
