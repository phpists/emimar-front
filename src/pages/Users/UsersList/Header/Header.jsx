export const Header = ({ onCreateUser, search, onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="title">User List</h5>

        <div className="d-flex align-items-center gap-2">
          {/* Поле пошуку */}
          <div className="form-control-wrap me-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search projects..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <button className="btn btn-primary" onClick={onCreateUser}>
            + Create User
          </button>
        </div>
      </div>
    </div>
  );
};
