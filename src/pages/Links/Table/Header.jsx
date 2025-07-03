import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";
import {Arrow} from "../../../components/Arrow";
import {useTranslation} from "react-i18next";

export const Header = ({ sortBy, sortDesc, onSortChange, onDelete, isAdmin }) => {
    const [dropdown, setDrodown] = useState(false);
    const dropdownRef = useRef();
    const { t } = /** @type {any} */ useTranslation('common');

    useClickOutside(dropdownRef, () => setDrodown(false));

    return (
        <tr className="nk-tb-item nk-tb-head">
            <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                #
              </span>
            </th>
            <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                {t('Name')}
                {/*<Arrow active={sortBy === "name"} desc={sortDesc}/>*/}
              </span>
            </th>
            <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                {t('Link')}
              </span>
            </th>
            <th className="nk-tb-col">
              <span className="sub-text d-flex align-items-center">
                {t('DateCreate')}
                {/*<Arrow active={sortBy === "created_at"} desc={sortDesc}/>*/}
              </span>
            </th>
            <th className="nk-tb-col nk-tb-col-tools text-end"></th>
        </tr>
    );
};
