export const Password = () => {
  return (
    <div class="card">
      <div class="card-inner card-inner-lg user-form">
        <div class="nk-block-head nk-block-head-lg">
          <div class="nk-block-between">
            <div class="nk-block-head-content">
              <h4 class="nk-block-title">Change password</h4>
              <div class="nk-block-des"></div>
            </div>
          </div>
        </div>
        <div class="nk-block">
          <div class="nk-data data-list">
            <div
              class="data-item"
              data-bs-toggle="modal"
              data-bs-target="#profile-edit"
            >
              <div class="data-col">
                <span class="data-label">New password</span>
                <div class="form-control-wrap">
                  <input
                    type="password"
                    class="form-control"
                    id="default-01"
                    placeholder="New password"
                  />
                </div>
              </div>
            </div>
            <div
              class="data-item"
              data-bs-toggle="modal"
              data-bs-target="#profile-edit"
            >
              <div class="data-col">
                <span class="data-label">New password confirmation</span>
                <div class="form-control-wrap">
                  <input
                    type="password"
                    class="form-control"
                    id="default-01"
                    placeholder="New password confirmation"
                  />
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-primary save-btn">
              Save
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
