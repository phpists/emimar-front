import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks";
import {
  useLazyMoveFolderLevelupQuery
} from "../../store/files/files.api";
import { toast } from "react-toastify";

export const Actions = ({ onEdit, onDelete , fullName , folderId, type , onRefetchData}) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();
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
                href={fullName}
                target="_blank"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <em className="icon ni ni-undo" />
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
                <em className="icon ni ni-trash" />
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
