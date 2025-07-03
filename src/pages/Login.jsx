import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useLazyLoginQuery } from "../store/auth/auth.api";
import { toast } from "react-toastify";
import { useActions } from "../hooks/actions";
import {useTranslation} from "react-i18next";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLazyLoginQuery();
  const { loginUser } = useActions();
  const navigate = useNavigate();
  const { t } = /** @type {any} */ useTranslation('common');

  const handleSubmit = () => {
    login({ login: email, password }).then((resp) => {
      if (resp.isSuccess) {
        loginUser(resp?.data.response.user);
        localStorage.setItem("token", resp?.data.response.access_token);
        navigate("/");
      } else {
        toast.error("Incorrect email or password");
      }
    });
  };

  return (
    <div className="nk-body npc-apps apps-only has-apps-sidebar npc-apps-files no-touch nk-nio-theme has-sidebar">
      <div className="nk-app-root">
        <div className="nk-main">
          <div className="nk-wrap nk-wrap nosidebar">
            <div className="nk-content">
              <div className="nk-block nk-block-middle nk-auth-body wide-xs">
                <div className="brand-logo pb-4 text-center">
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
                        <h4 className="nk-block-title">{t('SignInHeader')}</h4>
                      </div>
                    </div>
                    <div>
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="default-01">
                            {t('EmailOrUsername')}
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="default-01"
                            placeholder={t('EnterYourEmailAddressOrUsername')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="password">
                            {t('Password')}
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
                            placeholder={t('EnterYourPassword')}
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
                          {t('SignIn')}
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
