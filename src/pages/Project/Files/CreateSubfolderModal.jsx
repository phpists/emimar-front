import { useEffect, useState } from "react";
import {
    useLazyCreateFolderQuery,
    useLazyUpdateFolderQuery,
} from "../../../store/files/files.api";
import { toast } from "react-toastify";
import { useAppSelect } from "../../../hooks/redux";
import {useTranslation} from "react-i18next";

export const CreateSubfolderModal = ({ onClose, parentId, createSubfolderData, onRefetchData }) => {
    const [folderData, setFolderData] = useState({
        folder_name: "",
    });
    const [createFolder] = useLazyCreateFolderQuery();
    const [loading, setLoading] = useState(false);
    const { selectedProject } = useAppSelect((state) => state.auth);
    const { t } = /** @type {any} */ useTranslation('common');

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
                toast.success(t('SuccessfullyCreated'));
            } else {
                toast.error(t('Error'));
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
                            {t('CreateSubfolder')}
                        </h5>
                        <div className="close" onClick={onClose}>
                            <em className="icon ni ni-cross"/>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                        <label className="form-label">{t('FolderName')} <span className="text-danger">*</span></label>
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
                            {t('Create')}
                        </button>
                        <button className="btn btn-light" onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClose();
                        }}>
                            {t('Cancel')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
