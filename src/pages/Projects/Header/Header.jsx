import { useState } from "react";
import { CreateProject } from "../CreateProject";

export const Header = () => {
  const [createModal, setCreateModal] = useState(false);

  return (
    <div className="nk-block-head nk-block-head-sm">
      {createModal ? (
        <CreateProject onClose={() => setCreateModal(false)} />
      ) : null}
      <div className="nk-block-between">
        <div className="nk-block-head-content">
          <h3 className="nk-block-title page-title">Projects</h3>
          <div className="nk-block-des text-soft">
            <p>You have total 95 projects.</p>
          </div>
        </div>
        <div className="nk-block-head-content">
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
                    onClick={() => setCreateModal(true)}
                  >
                    <em className="icon ni ni-plus" />
                    <span>Add Project</span>
                  </a>
                </li>
                <li className="nk-block-tools-opt d-block d-sm-none">
                  <a href="#" className="btn btn-icon btn-primary">
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
