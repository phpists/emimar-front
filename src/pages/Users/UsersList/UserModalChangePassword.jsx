import { useEffect, useState } from "react";
import {
    useUpdateUserPasswordMutation
} from "../../../store/auth/auth.api";
import { toast } from "react-toastify";
import {useTranslation} from "react-i18next";

export const UserModalChangePassword = ({ onClose, userChangePassword }) => {
    const {userId, fullName} = userChangePassword;
    const [password, setPassword] = useState("");
    const [updateUserPassword] = useUpdateUserPasswordMutation();
    const { t } = /** @type {any} */ useTranslation('common');

    useEffect(() => {
        const overlay = document.querySelector(".modal-backdrop");
        overlay?.classList.add("show");
        return () => overlay?.classList.remove("show");
    }, []);

    const handleSubmit = async () => {
        try {
            await updateUserPassword({ user_id: userId, password }).unwrap();
            toast.success(t('SavedSuccessfully'));
            onClose();
        } catch (err) {
            toast.error(t('Error'));
        }
    };

    const isFormInvalid = !password;

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
                            {`${t('ChangePasswordFor')} ${fullName}`}
                        </h5>
                        <div className="close" onClick={onClose}>
                            <em className="icon ni ni-cross"/>
                        </div>
                    </div>

                    <div className="modal-body">
                        <div className="row">
                        <div className="form-group col-md-12">
                                <label className="form-label">{t('NewPassword')} <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer bg-light">
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={isFormInvalid}
                        >
                            {t('SaveChanges')}
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
