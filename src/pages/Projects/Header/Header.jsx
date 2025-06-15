import { useState } from "react";
import { CreateProject } from "../CreateProject";

export const Header = ({ search, onSearch, onCreate, total }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="nk-block-head nk-block-head-sm">
      <div className="nk-block-between">
        <div className="nk-block-head-content">
          <h3 className="nk-block-title page-title">Projects</h3>
          <div className="nk-block-des text-soft">
            <p>You have total {total} projects.</p>
          </div>
        </div>
        <div className="nk-block-head-content d-flex align-items-center gap-2">
          {/* Поле пошуку */}
          <div className="form-control-wrap">
            <input
              type="text"
              className="form-control"
              placeholder="Search projects..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <div className="toggle-wrap nk-block-tools-toggle">
            <a
              href="#"
              className="btn btn-icon btn-trigger toggle-expand me-n1"
              data-target="pageMenu"
            >
              <em className="icon ni ni-menu-alt-r" />
            </a>
            <div className="toggle-expand-content" data-content="pageMenu">
              <ul className="nk-block-tools g-3">
                <li className="nk-block-tools-opt d-none d-sm-block">
                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      onCreate();
                    }}
                  >
                    <em className="icon ni ni-plus" />
                    <span>Add Project</span>
                  </a>
                </li>
                <li className="nk-block-tools-opt d-block d-sm-none">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onCreate();
                    }}
                    className="btn btn-icon btn-primary"
                  >
                    <em className="icon ni ni-plus" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
