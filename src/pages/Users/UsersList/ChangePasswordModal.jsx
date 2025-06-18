import { useState } from "react";
import { useLazyChangePasswordQuery } from "../../../store/auth/auth.api";
import { toast } from "react-toastify";

export const ChangePasswordModal = ({ onClose, userId }) => {
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirm_password: "",
  });
  const [changePassword] = useLazyChangePasswordQuery();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (passwordData.password !== passwordData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    changePassword({
      user_id: userId,
      password: passwordData.password,
    })
      .then((resp) => {
        if (resp.isSuccess) {
          toast.success("Password changed successfully");
          onClose();
        } else {
          toast.error("Failed to change password");
        }
      })
      .finally(() => {
        setLoading(false);
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
            <h5 className="modal-title">Change Password</h5>
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
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={passwordData.password}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, password: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={passwordData.confirm_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirm_password: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="modal-footer bg-light">
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={
                loading ||
                !passwordData.password ||
                !passwordData.confirm_password
              }
            >
              Change Password
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