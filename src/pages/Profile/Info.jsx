import { useEffect, useState } from "react";
import { useAppSelect } from "../../hooks/redux";
import {useLazyUpdateUserQuery} from "../../store/auth/auth.api";
import { toast } from "react-toastify";
import {useActions} from "../../hooks/actions";

export const Info = () => {
  // const { user } = useAppSelect((state) => state.auth);
  const user = useAppSelect((state) => state.auth.user?.user);
  const [updateUser] = useLazyUpdateUserQuery();
  const { loginUser } = useActions();

  const [formData, setFormData] = useState({
    full_name: "",
    display_name: "",
    email: "",
    birth_day: "",
    phone: "",
  });

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
        loginUser(resp?.data?.response);
        toast.success("Успешно сохранено");
      } else {
        toast.error("Ошибка");
      }
    })
  };

  return (
    <div className="card">
      <div className="card-inner card-inner-lg user-form">
        <div className="nk-block-head nk-block-head-lg">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">Personal Information</h4>
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
                <span className="data-label">Full Name</span>
                <div className="form-control-wrap">
                  <input
                      type="text"
                      className="form-control"
                      name="full_name"
                      placeholder="Full Name"
                      value={formData.full_name}
                      onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Display Name</span>
                <div className="form-control-wrap">
                  <input
                      type="text"
                      className="form-control"
                      name="display_name"
                      placeholder="Display Name"
                      value={formData.display_name}
                      onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Email</span>
                <div className="form-control-wrap">
                  <input
                      type="email"
                      className="form-control"
                      name="email"
                      disabled
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Phone number</span>
                <div className="form-control-wrap">
                  <input
                      type="tel"
                      maxLength={16}
                      pattern="^\+?[0-9]{0,15}$"
                      className="form-control"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="data-item">
              <div className="data-col">
                <span className="data-label">Date of Birth</span>
                <div className="form-control-wrap">
                  <input
                      type="date"
                      className="form-control"
                      name="birth_day"
                      placeholder="Date of Birth"
                      value={formData.birth_day}
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
