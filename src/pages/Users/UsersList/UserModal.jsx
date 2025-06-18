import { useEffect, useState } from "react";
import {
  useLazyCreateUserQuery,
  useUpdateUserMutation,
} from "../../../store/auth/auth.api";
import { toast } from "react-toastify";
import { ChangePasswordModal } from "./ChangePasswordModal";

export const UserModal = ({ onClose, onRefetchUser, editUser }) => {
  const [newUser, setNewUser] = useState({
    id: "",
    full_name: "",
    display_name: "",
    email: "",
    birth_day: "",
    phone: "",
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [createUser] = useLazyCreateUserQuery();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");
    overlay?.classList.add("show");

    // Якщо це редагування, підставляємо значення
    if (editUser) {
      setNewUser({
        id: editUser.id,
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
          toast.success("Успешно сохранено");
        } else {
          toast.error("Ошибка");
        }
      });
    } else {
      createUser(newUser).then((resp) => {
        if (resp.isSuccess) {
          onClose();
          onRefetchUser();
          toast.success("Успешно создано");
        } else {
          toast.error("Ошибка");
        }
      });
    }
  };

  const isFormInvalid = !newUser.email || !newUser.full_name;

  return (
    <>
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
                {editUser ? "Edit User" : "Create User"}
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
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newUser.full_name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, full_name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newUser.display_name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, display_name: e.target.value })
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
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={newUser.birth_day}
                  onChange={(e) =>
                    setNewUser({ ...newUser, birth_day: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="modal-footer bg-light">
              {editUser && (
                <button
                  className="btn btn-outline-primary me-auto"
                  onClick={() => setShowPasswordModal(true)}
                >
                  Change Password
                </button>
              )}
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isFormInvalid}
              >
                {editUser ? "Save Changes" : "Create"}
              </button>
              <button className="btn btn-light" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
          userId={editUser?.id}
        />
      )}
    </>
  );
};
