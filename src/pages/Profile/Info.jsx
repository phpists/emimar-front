import { useEffect, useState } from "react";
import { useAppSelect } from "../../hooks/redux";
import {useLazyGetUserQuery, useLazyUpdateUserQuery} from "../../store/auth/auth.api";
import { toast } from "react-toastify";
import {useActions} from "../../hooks/actions";
import {useTranslation} from "react-i18next";

export const Info = () => {
  const user = useAppSelect((state) => state.auth.user?.user);
  const [updateUser] = useLazyUpdateUserQuery();
  const { loginUser } = useActions();
  const [getUser] = useLazyGetUserQuery();
  const { t } = /** @type {any} */ useTranslation('common');

  const [formData, setFormData] = useState({
    full_name: "",
    display_name: "",
    email: "",
    birth_day: "",
    phone: "",
  });

  useEffect(() => {
    getUser().then((resp) => {
      if (resp.isSuccess) {
        loginUser(resp?.data?.response);
      }
    });
  }, []);

  // Ініціалізація стейту лише при першому рендері
  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        display_name: user.display_name || "",
        email: user.email || "",
        birth_day: user.birth_day || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateUser({...formData, user_id: user.id}).then((resp) => {
      if (resp.isSuccess) {
        loginUser(resp?.data?.response)
        toast.success(t('SavedSuccessfully'));
      } else {
        toast.error(t('Error'));
      }
    });
  };

  return (
    <div className="card">
      <div className="card-inner card-inner-lg user-form">
        <div className="nk-block-head nk-block-head-lg">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">{t('PersonalInformation')}</h4>
              <div className="nk-block-des"></div>
            </div>
            <div className="nk-block-head-content align-self-start d-lg-none">
              <a
                href="#"
                className="toggle btn btn-icon btn-trigger mt-n1"
                data-target="userAside"
              >
                <em className="icon ni ni-menu-alt-r"></em>
              </a>
            </div>
          </div>
        </div>
        <div className="nk-block">
          <div className="nk-data data-list">
            <div className="data-item">
              <div className="data-col">
                <span className="data-label">{t('FullName')}</span>
                <div className="form-control-wrap">
                  <input
                      type="text"
                      className="form-control"
                      name="full_name"
                      placeholder={t('FullName')}
                      value={formData.full_name}
                      onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="data-item">
              <div className="data-col">
                <span className="data-label">{t('DisplayName')}</span>
                <div className="form-control-wrap">
                  <input
                      type="text"
                      className="form-control"
                      name="display_name"
                      placeholder={t('DisplayName')}
                      value={formData.display_name}
                      onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="data-item">
              <div className="data-col">
                <span className="data-label">{t('Email')}</span>
                <div className="form-control-wrap">
                  <input
                      type="email"
                      className="form-control"
                      name="email"
                      disabled
                      placeholder={t('Email')}
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="data-item">
              <div className="data-col">
                <span className="data-label">{t('PhoneNumber')}</span>
                <div className="form-control-wrap">
                  <input
                      type="tel"
                      maxLength={16}
                      pattern="^\+?[0-9]{0,15}$"
                      className="form-control"
                      name="phone"
                      placeholder={t('PhoneNumber')}
                      value={formData.phone}
                      onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="data-item">
              <div className="data-col">
                <span className="data-label">{t('DateOfBirth')}</span>
                <div className="form-control-wrap">
                  <input
                      type="date"
                      className="form-control"
                      name="birth_day"
                      placeholder={t('DateOfBirth')}
                      value={formData.birth_day}
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
