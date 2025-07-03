import { useEffect, useState } from "react";
import {
    useLazyCreateLinkQuery,
    useLazyUpdateLinkQuery,
} from "../../store/projects/projects.api";
import { toast } from "react-toastify";
import {useTranslation} from "react-i18next";

export const CreateLink = ({ onClose, editData, onRefetchData, total }) => {
    const [data, setData] = useState({
        name: "",
        link: "",
    });

    const [createLink] = useLazyCreateLinkQuery();
    const [updateLink] = useLazyUpdateLinkQuery();
    const [loading, setLoading] = useState(false);
    const { t } = /** @type {any} */ useTranslation('common');

    useEffect(() => {
        const overlay = document.querySelector(".modal-backdrop");
        overlay?.classList.add("show");
        return () => overlay?.classList.remove("show");
    }, []);

    useEffect(() => {
        if (editData) {
            setData({
                id: editData?.id,
                name: editData?.name,
                link: editData.link ?? ""
            });
        }
    }, [editData]);

    const handleSubmit = () => {
        if (data.title?.length === 0 || !data.link?.trim()) {
            toast.error(t('PleaseFillInAllRequiredFields'));
            return;
        }
        setLoading(true);
        if (editData) {
            updateLink(data).then((resp) => {
                setLoading(false);
                if (resp.isSuccess) {
                    onClose();
                    onRefetchData();
                    toast.success(t('SavedSuccessfully'));
                } else {
                    toast.error(t('Error'));
                }
            });
        } else {
            createLink(data).then((resp) => {
                setLoading(false);
                if (resp.isSuccess) {
                    onRefetchData();
                    onClose();
                    toast.success(t('SuccessfullyCreated'));
                } else {
                    toast.error(t('Error'));
                }
            });
        }
    };

    return (
        <div
            className="modal fade show"
            tabIndex={-1}
            id="modalCreateLink"
            aria-modal="true"
            role="dialog"
            style={{ display: "block" }}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {editData ? t('EditLink') : t('CreateLink')}
                        </h5>
                        <div className="close" onClick={onClose}>
                            <em className="icon ni ni-cross"/>
                        </div>
                    </div>

                    <div className="modal-body">
                        <form>
                        <div className="form-group">
                                <label className="form-label" htmlFor="project-name">
                                    {t('Name')} <span className="text-danger">*</span>
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder={t('EnterName')}
                                        value={data.name}
                                        onChange={(e) =>
                                            setData({...data, name: e.target.value})
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="project-number">
                                    {t('Link')} <span className="text-danger">*</span>
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className="form-control"
                                        id="project-number"
                                        placeholder={t('EnterLink')}
                                        value={data.link}
                                        onChange={(e) =>
                                            setData({...data, link: e.target.value})
                                        }
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer bg-light">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {editData ? t('Save') : t('Create')}
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            data-bs-dismiss="modal"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClose();
                            }}
                        >
                            {t('Cancel')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
