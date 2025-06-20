import { useState } from "react";
import { Header } from "./Header";
import { MobileHeader } from "./MobileHeader";
import { UploadModal } from "./UploadModal";
import { FolderModal } from "./FolderModal";
import { FoldersList } from "./FoldersList/FoldersList";
import { Files as FilesList } from "./Files/Files";
import { ConfirmDeleteModal } from "../../../components/ConfirmModal";
import {
  useDownloadFileMutation,
  useLazyDeleteFileQuery,
  useLazyDeleteFolderQuery, useLazyMoveFolderQuery, useLazyMoveLevelupFolderQuery,
} from "../../../store/files/files.api";
import { toast } from "react-toastify";
import {baseUrl} from "../../../api/baseUrl";

export const Files = ({
  data,
  search,
  onSearch,
  selected,
  onRefetchData,
  onSelectFolder,
  debouncedSearch ,
  isSearching
}) => {
  const [uploadModal, setUploadModal] = useState(false);
  const [folderModal, setFolderModal] = useState(false);
  const [editFolder, setEditFolder] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteFolder] = useLazyDeleteFolderQuery();
  const [deleteFile] = useLazyDeleteFileQuery();
  const [moveFolder] = useLazyMoveFolderQuery();
  const [downloadFile] = useDownloadFileMutation();
  const [moveLevelupFolder] = useLazyMoveLevelupFolderQuery();

  const [draggedItem, setDraggedItem] = useState(null);

  const handleOpenUploadModal = () => setUploadModal(true);
  const handleOpenFolderModal = () => setFolderModal(true);

  const handleCloseFolderModal = () => {
    setFolderModal(false);
    setEditFolder(null);
  };
  const handleEditFolder = (data) => {
    setFolderModal(true);
    setEditFolder(data);
  };

  const handleDelete = () => {
    if (deleting?.type === "folder") {
      deleteFolder(deleting.id).then((resp) => {
        if (resp.isSuccess) {
          onRefetchData();
          toast.success("Успешно удалено");
        } else {
          toast.error("Ошибка");
        }
      });
    } else if (deleting?.type === "file") {
      deleteFile(deleting.id).then((resp) => {
        if (resp.isSuccess) {
          onRefetchData();
          toast.success("Успешно удалено");
        } else {
          toast.error("Ошибка");
        }
      });
    }
    setDeleting(null);
  };

  const handleMove = ({ fromId, toFolderId, type }) => {
    moveFolder({ folder_id: fromId, new_parent_id: toFolderId }).then(
        (resp) => {
          if (resp.isSuccess) {
            toast.success("Перемещено!");
            onRefetchData()
          } else {
            toast.error("Ошибка");
          }
        })
  };

  const handleOpen = ({ url }) => {
    window.open(url, "_blank");
  }
  const handleDownload = ({ id, name }) => {
    downloadFile({ file_id: id, name });
  }

  const handleMoveUp = (id) => {
    moveLevelupFolder(id).then((res) => {
      if (res.isSuccess) {
        toast.success("Перемещено!");
        onRefetchData()
      } else {
        toast.error("Ошибка");
      }
    });
  }

  return (
    <div className="nk-fmg-body">
      <Header
        onOpenUploadModal={handleOpenUploadModal}
        onCreateFolder={handleOpenFolderModal}
        selected={selected}
        search={search}
        onSearch={onSearch}
      />
      {uploadModal ? (
        <UploadModal
          onClose={() => setUploadModal(false)}
          parentId={selected?.id}
          onRefetchData={onRefetchData}
        />
      ) : null}
      {folderModal ? (
        <FolderModal
          onClose={handleCloseFolderModal}
          parentId={selected?.id}
          editData={editFolder}
          onRefetchData={onRefetchData}
        />
      ) : null}
      {deleting ? (
        <ConfirmDeleteModal
          onClose={() => setDeleting(null)}
          onConfirm={handleDelete}
          title={`Are you sure you want to delete ${deleting.name}`}
        />
      ) : null}
      <div className="nk-fmg-body-content">
        <MobileHeader
          onOpenUploadModal={handleOpenUploadModal}
          onCreateFolder={handleOpenFolderModal}
        />

        <div className="nk-fmg-listing nk-block">
          <div className="nk-block-head-xs"></div>
          <div
            className="toggle-expand-content expanded"
            data-content="recent-files"
          >
            <div className="nk-files nk-files-view-group">
              <FoldersList
                data={data?.response?.list?.folders ?? []}
                selected={selected?.id}
                onEdit={handleEditFolder}
                onMove={handleMove}
                isSearching={isSearching}
                debouncedSearch ={debouncedSearch }
                draggedItem={draggedItem}
                setDraggedItem={setDraggedItem}
                onDelete={(data) => setDeleting(data)}
                onSelectFolder={onSelectFolder}
                search={search}
                onMoveUp={handleMoveUp}
              />
              <FilesList
                data={data?.response?.list?.files ?? []}
                onMove={handleMove}
                debouncedSearch ={debouncedSearch }
                isSearching={isSearching}
                draggedItem={draggedItem}
                setDraggedItem={setDraggedItem}
                selected={selected?.id}
                onDelete={(data) => setDeleting(data)}
                search={search}
                onOpen={handleOpen}
                onDownload={handleDownload}
                onMoveUp={handleMoveUp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
