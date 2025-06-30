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
import {Loading} from "../../../components/Loading";
import {CreateSubfolderModal} from "./CreateSubfolderModal";
import {useAppSelect} from "../../../hooks/redux";
import {ROLES} from "../../../constats/roles";

export const Files = ({
  data,
  search,
  onSearch,
  selected,
  onRefetchData,
  onSelectFolder,
  debouncedSearch,
  isLoading,
  onGoUp,
  isRootSelected,
  isSearching
}) => {
  const [uploadModal, setUploadModal] = useState(false);
  const [folderModal, setFolderModal] = useState(false);
  const [createSubfolderModal, setSubfolderModal] = useState(false);
  const [editFolder, setEditFolder] = useState(null);
  const [createSubfolderData, setCreateSubfolderData] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteFolder] = useLazyDeleteFolderQuery();
  const [deleteFile] = useLazyDeleteFileQuery();
  const [moveFolder] = useLazyMoveFolderQuery();
  const [downloadFile] = useDownloadFileMutation();
  const [moveLevelupFolder] = useLazyMoveLevelupFolderQuery();

  const rawUser = useAppSelect((state) => state.auth.user);
  const user = rawUser?.user || rawUser;
  const isAdmin = user?.role_id === ROLES.ADMIN;

  const [draggedItem, setDraggedItem] = useState(null);

  const handleOpenUploadModal = () => setUploadModal(true);
  const handleOpenFolderModal = () => setFolderModal(true);

  const handleCloseFolderModal = () => {
    setFolderModal(false);
    setEditFolder(null);
  };

  const handleCloseCreateSubfolderModal = () => {
    setSubfolderModal(false);
    setCreateSubfolderData(null);
  };

  const handleEditFolder = (data) => {
    setFolderModal(true);
    setEditFolder(data);
  };

  const handleCreateSubfolder = (data) => {
    setSubfolderModal(true);
    setCreateSubfolderData(data);
  }

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
    if (!isAdmin) return;
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
        onGoUp={onGoUp}
        isRootSelected={isRootSelected}
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
      {createSubfolderModal ? (
        <CreateSubfolderModal
           onClose={handleCloseCreateSubfolderModal}
           parentId={selected?.id}
           createSubfolderData={createSubfolderData}
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
          selected={selected}
        />

        <div className="nk-fmg-listing nk-block">
          <div className="nk-block-head-xs"></div>
          <div
            className="toggle-expand-content expanded"
            data-content="recent-files"
          >
            <div className="nk-files nk-files-view-group">
              {isLoading ? <Loading /> :
                <>
                  <FoldersList
                      data={data?.response?.list?.folders ?? []}
                      selected={selected?.id}
                      onEdit={handleEditFolder}
                      onCreateSubfolder={handleCreateSubfolder}
                      onMove={handleMove}
                      isSearching={isSearching}
                      debouncedSearch ={debouncedSearch }
                      draggedItem={draggedItem}
                      setDraggedItem={setDraggedItem}
                      onDelete={(data) => setDeleting(data)}
                      onSelectFolder={onSelectFolder}
                      search={search}
                      onMoveUp={handleMoveUp}
                      isAdmin={isAdmin}
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
                      isAdmin={isAdmin}
                  />
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
