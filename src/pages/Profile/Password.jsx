export const Password = () => {
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
                    placeholder="New password"
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
                    placeholder="New password confirmation"
                  />
                </div>
              </div>
            </div>
            <a href="#" className="btn btn-primary save-btn">
              Save
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
