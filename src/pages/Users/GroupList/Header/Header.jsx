import { useState } from "react";
import { GroupModal } from "../GroupModal";

export const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal && <GroupModal onClose={() => setShowModal(false)} />}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="title">Group List</h5>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Create Group
        </button>
      </div>
    </div>
  );
};
