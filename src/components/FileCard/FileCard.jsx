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
  draggable,
  onDragStart,
  onDrop,
  onDragOver,
  fullName,
  folderId,
  onRefetchData
}) => (
  <div
    className={`nk-file-item nk-file ${onSelect && "cursor-pointer"}`}
    onClick={(e) => {
      e.preventDefault();
      onSelect && onSelect();
    }}
  >
    <div className="nk-file-info" 
      onClick={onSelect}
      draggable={draggable}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
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
                onSelect && onSelect();
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
    <Actions 
      type={type} 
      onEdit={onEdit}
      onDelete={onDelete}
      fullName={fullName}
      folderId={folderId} 
      onRefetchData={onRefetchData} 
    />
  </div>
);
