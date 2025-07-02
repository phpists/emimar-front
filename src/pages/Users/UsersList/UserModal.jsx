import { useEffect, useState } from "react";
import {
  useLazyCreateUserQuery,
  useLazyUpdateUserQuery,
} from "../../../store/auth/auth.api";
import { toast } from "react-toastify";
import {useTranslation} from "react-i18next";

export const UserModal = ({ onClose, onRefetchUser, editUser }) => {
  const { t } = /** @type {any} */ useTranslation('common');

  const [newUser, setNewUser] = useState({
    user_id: "",
    full_name: "",
    display_name: "",
    email: "",
    birth_day: "",
    phone: ""
  });

  const [createUser] = useLazyCreateUserQuery();
  const [updateUser] = useLazyUpdateUserQuery();

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");
    overlay?.classList.add("show");

    // Якщо це редагування, підставляємо значення
    if (editUser) {
      setNewUser({
        user_id: editUser.user_id || "",
        full_name: editUser.full_name || "",
        display_name: editUser.display_name || "",
        email: editUser.email || "",
        birth_day: editUser.birth_day?.split("T")[0] || "", // якщо це ISO рядок
        phone: editUser.phone || "",
      });
    }

    return () => overlay?.classList.remove("show");
  }, [editUser]);

  const handleSubmit = () => {
    if (editUser) {
      updateUser(newUser).then((resp) => {
        if (resp.isSuccess) {
          onClose();
          onRefetchUser();
          toast.success(t('SavedSuccessfully'));
        } else {
          toast.error(t('Error'));
        }
      });
    } else {
      createUser(newUser).then((resp) => {
        if (resp.isSuccess) {
          onClose();
          onRefetchUser();
          toast.success(t('SuccessfullyCreated'));
        } else {
          toast.error(t('Error'));
        }
      });
    }
  };

  const isFormInvalid = !newUser.email || !newUser.full_name;

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
              {editUser ? t('EditUser') : t('CreateUser')}
            </h5>
            <a
              href="#"
              className="close"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              <em className="icon ni ni-cross" />
            </a>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-label">{t('FullName')}</label>
                <input
                    type="text"
                    className="form-control"
                    value={newUser.full_name}
                    onChange={(e) =>
                        setNewUser({...newUser, full_name: e.target.value})
                    }
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">{t('DisplayName')}</label>
                <input
                    type="text"
                    className="form-control"
                    value={newUser.display_name}
                    onChange={(e) =>
                        setNewUser({...newUser, display_name: e.target.value})
                    }
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t('Email')}</label>
              <input
                  type="email"
                  className="form-control"
                  value={newUser.email}
                  onChange={(e) =>
                      setNewUser({...newUser, email: e.target.value})
                  }
              />
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-label">{t('PhoneNumber')}</label>
                <input
                    type="tel"
                    maxLength={16}
                    pattern="^\+?[0-9]{0,15}$"
                    className="form-control"
                    value={newUser.phone}
                    onChange={(e) =>
                        setNewUser({...newUser, phone: e.target.value})
                    }
                />
              </div>

              <div className="form-group col-md-6">
                <label className="form-label">{t('DateOfBirth')}</label>
                <input
                    type="date"
                    className="form-control"
                    value={newUser.birth_day}
                    onChange={(e) =>
                        setNewUser({...newUser, birth_day: e.target.value})
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
              {editUser ? t('SaveChanges') : t('Create')}
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
