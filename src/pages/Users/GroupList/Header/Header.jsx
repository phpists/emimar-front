import { useState } from "react";
import { GroupModal } from "../GroupModal";

export const Header = ({ onCreateGroup, search, onSearch, total }) => {
    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };
    return (
    <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="nk-block-head-content">
                <h5 className="title">Group List</h5>
                <div className="nk-block-des text-soft">
                    <p>{`You have ${total} group${total !== 1 ? 's' : ''}.`}</p>
                </div>
            </div>
            <div className="nk-block-head-content d-flex align-items-center gap-2">
                <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search projects..."
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={onCreateGroup}>
                        + Create Group
                    </button>
                </div>
            </div>
        </div>
        );
        };
