import { useEffect, useState } from "react";
import {
    useLazyCreateFolderQuery,
    useLazyUpdateFolderQuery,
} from "../../../store/files/files.api";
import { toast } from "react-toastify";
import { useAppSelect } from "../../../hooks/redux";

export const CreateSubfolderModal = ({ onClose, parentId, createSubfolderData, onRefetchData }) => {
    const [folderData, setFolderData] = useState({
        folder_name: "",
    });
    const [createFolder] = useLazyCreateFolderQuery();
    const [loading, setLoading] = useState(false);
    const { selectedProject } = useAppSelect((state) => state.auth);

    useEffect(() => {
        const overlay = document.querySelector(".modal-backdrop");
        overlay?.classList.add("show");
        return () => overlay?.classList.remove("show");
    }, []);

    const handleSubmit = () => {
        createFolder({
            project_id: selectedProject,
            parent_id: createSubfolderData.id,
            folder_name: folderData.folder_name,
        }).then((resp) => {
            setLoading(false);
            if (resp.isSuccess) {
                onClose();
                onRefetchData();
                toast.success("Успешно создано");
            } else {
                toast.error("Ошибка");
            }
        });
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
                            Create Subfolder Folder
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
                                className="form-control"
                                value={folderData.folder_name}
                                onChange={(e) =>
                                    setFolderData({ ...folderData, folder_name: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div className="modal-footer bg-light">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                handleSubmit();
                            }}
                            disabled={folderData?.folder_name?.length === 0 || loading}
                        >
                            Create
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
