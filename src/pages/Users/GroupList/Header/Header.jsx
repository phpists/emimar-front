import { useState } from "react";
import { GroupModal } from "../GroupModal";

export const Header = ({ onCreateGroup }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="title">Group List</h5>
        <button className="btn btn-primary" onClick={onCreateGroup}>
          + Create Group
        </button>
      </div>
    </div>
  );
};
