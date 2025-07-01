import {useAppSelect} from "../../../hooks/redux";
import {ROLES} from "../../../constats/roles";

export const Header = ({ search, onSearch, onCreate, total, searchType, onSearchTypeChange }) => {

  const rawUser = useAppSelect((state) => state.auth.user);
  const user = rawUser?.user || rawUser;

  const isAdmin = user?.role_id === ROLES.ADMIN;

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleRadioChange = (e) => {
    onSearchTypeChange?.(e.target.value);
  };

  return (
    <div className="nk-block-head nk-block-head-sm">
      <div className="nk-block-between">
        <div className="nk-block-head-content">
          <h3 className="nk-block-title page-title">Projects</h3>
          <div className="nk-block-des text-soft">
            <p>{`You have ${total} project${total !== 1 ? 's' : ''}.`}</p>
          </div>
        </div>
        <div className="nk-block-head-content d-flex align-items-center gap-2">
          <div className="search-type-options d-flex gap-2 align-items-center">
            <label>
              <input
                  type="radio"
                  name="searchType"
                  value="1"
                  checked={searchType === "1"}
                  onChange={handleRadioChange}
                  style={{ cursor: 'pointer' }}/> Projects
            </label>
            <label>
              <input
                  type="radio"
                  name="searchType"
                  value="2"
                  checked={searchType === "2"}
                  onChange={handleRadioChange}
                  style={{ cursor: 'pointer' }}/> Deals
            </label>
            <label>
              <input
                  type="radio"
                  name="searchType"
                  value="3"
                  checked={searchType === "3"}
                  onChange={handleRadioChange}
                  style={{ cursor: 'pointer' }}/> Contracts
            </label>
            <label>
              <input
                  type="radio"
                  name="searchType"
                  value="4"
                  checked={searchType === "4"}
                  onChange={handleRadioChange}
                  style={{ cursor: 'pointer' }}/> Orders
            </label>
          </div>
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
              <em className="icon ni ni-menu-alt-r"/>
            </a>
            <div className="toggle-expand-content" data-content="pageMenu">
              <ul className="nk-block-tools g-3">
                {isAdmin && (
                    <li className="nk-block-tools-opt d-none d-sm-block">
                      <a
                          href="#"
                          className="btn btn-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            onCreate();
                          }}
                      >
                        <em className="icon ni ni-plus"/>
                        <span>Add Project</span>
                      </a>
                    </li>
                )}
                {/*<li className="nk-block-tools-opt d-block d-sm-none">*/}
                {/*  <a*/}
                {/*      href="#"*/}
                {/*      onClick={(e) => {*/}
                {/*        e.preventDefault();*/}
                {/*        onCreate();*/}
                {/*      }}*/}
                {/*      className="btn btn-icon btn-primary"*/}
                {/*  >*/}
                {/*    <em className="icon ni ni-plus"/>*/}
                {/*  </a>*/}
                {/*</li>*/}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
