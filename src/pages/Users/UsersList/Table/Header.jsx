import { useRef, useState } from "react";
import { useClickOutside } from "../../../../hooks";
import {Arrow} from "../../../../components/Arrow";

export const Header = ({ isSelectedAll, onSelectAll, sortBy, sortDesc, onSortChange, onDelete }) => {
  const [dropdown, setDrodown] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setDrodown(false));

  return (
      <tr className="nk-tb-item nk-tb-head">
          <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                #
              </span>
          </th>
          <th className="nk-tb-col" style={{cursor: "pointer"}} onClick={() => onSortChange("display_name")}>
              <span className="sub-text d-flex align-items-center">
                Name
                <Arrow active={sortBy === "display_name"} desc={sortDesc}/>
              </span>
          </th>
          <th className="nk-tb-col" style={{cursor: "pointer"}} onClick={() => onSortChange("created_at")}>
              <span className="sub-text d-flex align-items-center">
                Date create
                <Arrow active={sortBy === "created_at"} desc={sortDesc}/>
              </span>
          </th>
          <th className="nk-tb-col" style={{cursor: "pointer"}} onClick={() => onSortChange("email")}>
              <span className="sub-text d-flex align-items-center">
                Email
                <Arrow active={sortBy === "email"} desc={sortDesc}/>
              </span>
          </th>
          <th className="nk-tb-col nk-tb-col-tools text-end"></th>
      </tr>
  );
};
