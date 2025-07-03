import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";
import {Arrow} from "../../../components/Arrow";
import {useTranslation} from "react-i18next";

export const Header = ({ sortBy, sortDesc, onSortChange, onDelete, isAdmin }) => {
  const { t } = /** @type {any} */ useTranslation('common');
  const [dropdown, setDrodown] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setDrodown(false));

  return (
      <tr className="nk-tb-item nk-tb-head">
          <th className="nk-tb-col" style={{cursor: "pointer"}} onClick={() => onSortChange("project_number")}>
              <span className="sub-text d-flex align-items-center">
                No.
                  <Arrow active={sortBy === "project_number"} desc={sortDesc}/>
              </span>
          </th>
          <th className="nk-tb-col" style={{cursor: "pointer"}} onClick={() => onSortChange("title")}>
              <span className="sub-text d-flex align-items-center">
                {t('Name')}
                <Arrow active={sortBy === "title"} desc={sortDesc}/>
              </span>
          </th>
          <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                {t('Address')}
              </span>
          </th>
          <th className="nk-tb-col" style={{cursor: "pointer"}} onClick={() => onSortChange("created_at")}>
              <span className="sub-text d-flex align-items-center">
                {t('DateCreate')}
                <Arrow active={sortBy === "created_at"} desc={sortDesc}/>
              </span>
          </th>
          <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                {t('Users')}
              </span>
          </th>
          <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                {t('Groups')}
              </span>
          </th>
          <th className="nk-tb-col nk-tb-col-tools text-end"></th>
      </tr>
  );
};
