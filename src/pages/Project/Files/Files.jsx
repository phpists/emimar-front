import { useState } from "react";
import { Header } from "./Header";
import { MobileHeader } from "./MobileHeader";
import { UploadModal } from "./UploadModal";
import { FolderModal } from "./FolderModal";
import { FoldersList } from "./FoldersList/FoldersList";
import { Files as FilesList } from "./Files/Files";
import { ConfirmDeleteModal } from "../../../components/ConfirmModal";
import {
  useLazyDeleteFileQuery,
  useLazyDeleteFolderQuery,
} from "../../../store/files/files.api";
import { toast } from "react-toastify";

export const Files = ({ data, search, onSearch, selected, onRefetchData, onSelectFolder }) => {
  const [uploadModal, setUploadModal] = useState(false);
  const [folderModal, setFolderModal] = useState(false);
  const [editFolder, setEditFolder] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteFolder] = useLazyDeleteFolderQuery();
  const [deleteFile] = useLazyDeleteFileQuery();

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
          parentId={selected}
          onRefetchData={onRefetchData}
        />
      ) : null}
      {folderModal ? (
        <FolderModal
          onClose={handleCloseFolderModal}
          parentId={selected}
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
                selected={selected}
                onEdit={handleEditFolder}
                onDelete={(data) => setDeleting(data)}
                onSelectFolder={onSelectFolder}
                search={search}
              />
              <FilesList
                data={data?.response?.list?.files ?? []}
                selected={selected}
                onDelete={(data) => setDeleting(data)}
                search={search}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
