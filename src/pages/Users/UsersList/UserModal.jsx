import { useEffect, useState } from "react";

export const UserModal = ({ onClose }) => {
  const [newUser, setNewUser] = useState({
    fullName: "",
    displayName: "",
    email: "",
    dob: "",
    password: "",
  });
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");
    overlay?.classList.add("show");
    return () => overlay?.classList.remove("show");
  }, []);

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
            <h5 className="modal-title">Create User</h5>
            <a href="#" className="close" onClick={onClose}>
              <em className="icon ni ni-cross" />
            </a>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.fullName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, fullName: e.target.value })
                  }
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Display Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.displayName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, displayName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                value={newUser.dob}
                onChange={(e) =>
                  setNewUser({ ...newUser, dob: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="changePasswordSwitch"
                  checked={changePassword}
                  onChange={() => setChangePassword(!changePassword)}
                />
                <label
                  className="custom-control-label"
                  htmlFor="changePasswordSwitch"
                >
                  Change Password
                </label>
              </div>
            </div>

            {changePassword && (
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </div>
            )}
          </div>

          <div className="modal-footer bg-light">
            <button className="btn btn-primary" onClick={onClose}>
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
