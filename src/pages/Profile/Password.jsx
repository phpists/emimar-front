import {useState} from "react";
import {useAppSelect} from "../../hooks/redux";
import {toast} from "react-toastify";
import {useUpdateUserPasswordMutation} from "../../store/auth/auth.api";
import {useTranslation} from "react-i18next";

export const Password = () => {
  const user = useAppSelect((state) => state.auth.user?.user);
  const [updateUserPassword] = useUpdateUserPasswordMutation();
  const { t } = /** @type {any} */ useTranslation('common');

  const [formData, setFormData] = useState({
    passwordUnique: "",
    repeatPasswordUnique: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({name, value});
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log({formData});
    if (formData.passwordUnique !== formData.repeatPasswordUnique) {
      toast.error(t('ThePasswordsDoNotMatch'));
      return;
    }
    try {
      await updateUserPassword({ user_id: user.id, password: formData.passwordUnique }).unwrap();
      toast.success(t('SavedSuccessfully'));
    } catch (err) {
      toast.error(t('Error'));
    }
  };

  return (
    <div className="card">
      <div className="card-inner card-inner-lg user-form">
        <div className="nk-block-head nk-block-head-lg">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">{t('ChangePassword')}</h4>
              <div className="nk-block-des"></div>
            </div>
          </div>
        </div>
        <div className="nk-block">
          <div className="nk-data data-list">
            <div
              className="data-item"
              data-bs-toggle="modal"
              data-bs-target="#profile-edit"
            >
              <div className="data-col">
                <span className="data-label">{t('NewPassword')}</span>
                <div className="form-control-wrap">
                  <input
                    type="password"
                    className="form-control"
                    id="passwordUnique"
                    name="passwordUnique"
                    placeholder={t('NewPassword')}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div
              className="data-item"
              data-bs-toggle="modal"
              data-bs-target="#profile-edit"
            >
              <div className="data-col">
                <span className="data-label">{t('NewPasswordConfirmation')}</span>
                <div className="form-control-wrap">
                  <input
                    type="password"
                    className="form-control"
                    id="repeatPasswordUnique"
                    name="repeatPasswordUnique"
                    placeholder={t('NewPasswordConfirmation')}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSave} className="btn btn-primary mt-2">
              {t('Save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
