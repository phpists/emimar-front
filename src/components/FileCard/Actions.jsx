import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks";
import {
  useLazyDownloadFileQuery,
  useLazyMoveFolderLevelupQuery
} from "../../store/files/files.api";
import { toast } from "react-toastify";

export const Actions = ({ keyId, onEdit, onDelete , fullName , folderId, type , onRefetchData}) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();
  const [downloadFile] = useLazyDownloadFileQuery();
  const [moveFolderLevelup] = useLazyMoveFolderLevelupQuery();
  useClickOutside(dropdownRef, () => setShow(false));

  const handleFolderLevelup = () => {
    moveFolderLevelup({folder_id: folderId}).then((resp) => {
      if(resp.isSuccess){
        toast.success("Перемещено");
        onRefetchData()
      }else{
        toast.error("Ошибка");
      }
    })
  }

  const handleDownload = async () => {
    try {
      const { data, error } = await downloadFile({ file_id: keyId });
      if (error || !data) {
        toast.error("Помилка при завантаженні файлу");
        return;
      }
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = fullName?.split("/").pop() || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      toast.error("Помилка при завантаженні");
      console.error("Download error", e);
    }
  };
  

  return (
    <div className="nk-file-actions">
      <div className={`dropdown ${show ? "show" : ""}`} ref={dropdownRef}>
        <a
          href
          className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
          data-bs-toggle="dropdown"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation()
            setShow(!show);
          }}
        >
          <em className="icon ni ni-more-h" />
        </a>
        <div
          className={`dropdown-menu dropdown-menu-end ${show ? "show" : ""}`}
        >
          <ul className="link-list-plain no-bdr">
            {onEdit ? (
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit();
                  }}
                >
                  <em className="icon ni ni-pen" />
                  <span>Rename</span>
                </a>
              </li>
            ) : null}
            {type !== 'folder' && <li>
              <a
                href={fullName}
                target="_blank"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <em className="icon ni ni-undo" />
                <span>View</span>
              </a>
            </li>}
            {type !== 'folder' && <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDownload();
                }}
              >
                <em className="icon ni ni-download" />
                <span>Download</span>
              </a>
            </li>}
            {type === "folder" && <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleFolderLevelup();
                }}
              >
                <em className="icon ni ni-arrow-up" />
                <span>Move level up</span>
              </a>
            </li>}
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <em className="icon ni ni-trash" />
                <span>Delete</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
