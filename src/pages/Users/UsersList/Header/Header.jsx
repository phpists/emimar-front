export const Header = ({ onCreateUser }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="title">User List</h5>
        <button className="btn btn-primary" onClick={onCreateUser}>
          + Create User
        </button>
      </div>
    </div>
  );
};
