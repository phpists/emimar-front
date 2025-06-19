import {useEffect, useState} from "react";
import {useAppSelect} from "../../hooks/redux";
import {toast} from "react-toastify";
import {useUpdateUserPasswordMutation} from "../../store/auth/auth.api";

export const Password = () => {
  const user = useAppSelect((state) => state.auth.user?.user);
  const [updateUserPassword] = useUpdateUserPasswordMutation();

  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (formData.password !== formData.repeatPassword) {
      toast.error("Пароли не совпадают");
      return;
    }
    try {
      await updateUserPassword({ user_id: user.id, password: formData.password }).unwrap();
      toast.success("Успешно сохранено");
    } catch (err) {
      toast.error("Ошибка");
    }
  };

  return (
    <div className="card">
      <div className="card-inner card-inner-lg user-form">
        <div className="nk-block-head nk-block-head-lg">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">Change password</h4>
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
                <span className="data-label">New password</span>
                <div className="form-control-wrap">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="New password"
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
                <span className="data-label">New password confirmation</span>
                <div className="form-control-wrap">
                  <input
                    type="password"
                    className="form-control"
                    id="repeat-password"
                    name="repeatPassword"
                    placeholder="New password confirmation"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSave} className="btn btn-primary save-btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
