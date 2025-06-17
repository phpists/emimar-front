import { useEffect, useState } from "react";
import {
  useLazyUpdateUserPasswordQuery
} from "../../../store/auth/auth.api";
import { toast } from "react-toastify";

export const UserPasswordModal = ({ onClosePasswordModal, onRefetchUser, editUser }) => {
  const [user, setNewUser] = useState({
    user_id: editUser.user_id,
    password: ""
  });

  const [updateUserPassword] = useLazyUpdateUserPasswordQuery();

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");
    overlay?.classList.add("show");
    return () => overlay?.classList.remove("show");
  }, [editUser]);

  const handleSubmit = () => {
    console.log(user)
      updateUserPassword(user).then((resp) => {
        if (resp.isSuccess) {
          onClosePasswordModal();
          onRefetchUser();
          toast.success("Успешно сохранено");
        } else {
          toast.error("Ошибка");
        }
      });
  };

  const isFormInvalid = !user.password;

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
              Change password
            </h5>
            <a
              href="#"
              className="close"
              onClick={(e) => {
                e.preventDefault();
                onClosePasswordModal();
              }}
            >
              <em className="icon ni ni-cross" />
            </a>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter new password"
                  value={user.password}
                  onChange={(e) =>{
                    setNewUser({ ...user, password: e.target.value })
                  }}
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
              Save password
            </button>
            <button className="btn btn-light" onClick={onClosePasswordModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};