import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/auth/auth.api";
import { toast } from "react-toastify";
import { useActions } from "../hooks/actions";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const { loginUser } = useActions();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await login({ login: email, password }).unwrap();
      if (response?.data?.response?.user) {
        loginUser(response.data.response.user);
        localStorage.setItem("token", response.data.response.access_token);
        navigate("/");
        toast.success("Успешный вход");
      } else {
        toast.error("Неверные данные для входа");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.data?.message || "Ошибка при входе");
    }
  };

  return (
    <div className="nk-body npc-apps apps-only has-apps-sidebar npc-apps-files no-touch nk-nio-theme has-sidebar">
      <div className="nk-app-root">
        <div className="nk-main">
          <div className="nk-wrap nk-wrap nosidebar">
            <div className="nk-content">
              <div className="nk-block nk-block-middle nk-auth-body wide-xs">
                <div class="brand-logo pb-4 text-center">
                  <img
                    src="/assets/images/big-logo.png"
                    alt=""
                    className="auth-logo"
                  />
                </div>
                <div className="card card-bordered">
                  <div className="card-inner card-inner-lg">
                    <div className="nk-block-head">
                      <div className="nk-block-head-content">
                        <h4 className="nk-block-title">Sign-In</h4>
                      </div>
                    </div>
                    <div>
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label" for="default-01">
                            Email or Username
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="default-01"
                            placeholder="Enter your email address or username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label" for="password">
                            Password
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          <div
                            href="#"
                            className={` form-icon form-icon-right passcode-switch lg  ${
                              showPassword && "is-shown"
                            }`}
                            data-target="password"
                          >
                            <em
                              className="passcode-icon icon-show icon ni ni-eye"
                              onClick={() => setShowPassword(true)}
                            ></em>
                            <em
                              className="passcode-icon icon-hide icon ni ni-eye-off"
                              onClick={() => setShowPassword(false)}
                            ></em>
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control form-control-lg is-shown ${
                              showPassword && "is-shown"
                            }`}
                            id="password"
                            placeholder="Enter your passcode"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <button
                          className="btn btn-lg btn-primary btn-block"
                          disabled={
                            email.length === 0 || password?.length === 0
                          }
                          onClick={handleSubmit}
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
