import { useState } from "react";
import { UserModal } from "../../UsersList/UserModal";

export const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal && <UserModal onClose={() => setShowModal(false)} />}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="title">User List</h5>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Create User
        </button>
      </div>
    </div>
  );
};
