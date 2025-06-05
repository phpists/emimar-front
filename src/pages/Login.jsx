import { useState } from "react";
import { NavLink } from "react-router";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="nk-body npc-apps apps-only has-apps-sidebar npc-apps-files no-touch nk-nio-theme has-sidebar">
      <div className="nk-app-root">
        <div className="nk-main">
          <div className="nk-wrap nk-wrap nosidebar">
            <div className="nk-content">
              <div className="nk-block nk-block-middle nk-auth-body wide-xs">
                <div className="card card-bordered">
                  <div className="card-inner card-inner-lg">
                    <div className="nk-block-head">
                      <div className="nk-block-head-content">
                        <h4 className="nk-block-title">Sign-In</h4>
                      </div>
                    </div>
                    <form action="/demo3/index.html">
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
                          <a
                            href="#"
                            className={`form-icon form-icon-right passcode-switch lg  ${
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
                          </a>
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control form-control-lg is-shown ${
                              showPassword && "is-shown"
                            }`}
                            id="password"
                            placeholder="Enter your passcode"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <NavLink
                          to="/"
                          className="btn btn-lg btn-primary btn-block"
                        >
                          Sign in
                        </NavLink>
                      </div>
                    </form>
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
