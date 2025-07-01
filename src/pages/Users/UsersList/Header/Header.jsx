export const Header = ({ onCreateUser, search, onSearch, total }) => {

    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    return (
    <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="nk-block-head-content">
                <h5 className="title">User List</h5>
                <div className="nk-block-des text-soft">
                    <p>{`You have ${total} user${total !== 1 ? 's' : ''}.`}</p>
                </div>
            </div>

            <div className="nk-block-head-content d-flex align-items-center gap-2">
                <div className="form-control-wrap">
                <input
                            type="text"
                            className="form-control"
                            placeholder="Search users..."
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
