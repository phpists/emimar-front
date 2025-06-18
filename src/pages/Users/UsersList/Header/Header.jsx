export const Header = ({ onCreateUser, search, onSearch }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="title">User List</h5>
        <div className="nk-fmg-search">
          <em className="icon ni ni-search" />
          <input
            type="text"
            className="form-control border-transparent form-focus-none"
            placeholder="Search users"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={onCreateUser}>
          + Create User
        </button>
      </div>
    </div>
  );
};
