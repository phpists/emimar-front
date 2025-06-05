export const Info = () => {
  return (
    <div class="card">
      <div class="card-inner card-inner-lg user-form">
        <div class="nk-block-head nk-block-head-lg">
          <div class="nk-block-between">
            <div class="nk-block-head-content">
              <h4 class="nk-block-title">Personal Information</h4>
              <div class="nk-block-des"></div>
            </div>
            <div class="nk-block-head-content align-self-start d-lg-none">
              <a
                href="#"
                class="toggle btn btn-icon btn-trigger mt-n1"
                data-target="userAside"
              >
                <em class="icon ni ni-menu-alt-r"></em>
              </a>
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
                <span class="data-label">Full Name</span>
                <div class="form-control-wrap">
                  <input
                    type="text"
                    class="form-control"
                    id="default-01"
                    placeholder="Full Name"
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
                <span class="data-label">Display Name</span>
                <div class="form-control-wrap">
                  <input
                    type="text"
                    class="form-control"
                    id="default-01"
                    placeholder="Name"
                  />
                </div>
              </div>
            </div>
            <div class="data-item">
              <div class="data-col">
                <span class="data-label">Email</span>
                <div class="form-control-wrap">
                  <input
                    type="text"
                    class="form-control"
                    id="default-01"
                    placeholder="Email"
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
                <span class="data-label">Date of Birth</span>
                <div class="form-control-wrap">
                  <input
                    type="date"
                    class="form-control"
                    id="default-01"
                    placeholder="Date of Birth"
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
