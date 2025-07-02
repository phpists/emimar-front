import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";
import {useTranslation} from "react-i18next";

export const Row = ({
                        name,
                        link,
                        createAt,
                        onEdit,
                        onDelete,
                        index,
                        // isAdmin,
                        id,
                    }) => {
    const [dropdown, setDrodown] = useState(false);
    const dropdownRef = useRef();
    const { t } = /** @type {any} */ useTranslation('common');

    useClickOutside(dropdownRef, () => setDrodown(false));

    const handleOpenLink = () => {
        window.open(link, "_blank");
    };

    return (
        <tr className="nk-tb-item" onClick={handleOpenLink}>
            <td className="nk-tb-col">
                <span>{index}</span>
            </td>
            <td className="nk-tb-col" onClick={(e) => e.preventDefault()}>
                <div className="project-title">
                    <div className="project-info">
                        <h6 className="title">{name}</h6>
                    </div>
                </div>
            </td>
            <td className="nk-tb-col cursor-pointer" onClick={handleOpenLink}>
                <span>{link}</span>
            </td>
            <td className="nk-tb-col">
                <span>{createAt}</span>
            </td>
            <td
                className="nk-tb-col nk-tb-col-tools"
                onClick={(e) => e.stopPropagation()}
            >
                <ul className="nk-tb-actions gx-1">
                    <li>
                        <div
                            ref={dropdownRef}
                            className={`drodown  ${dropdown ? "show" : ""}`}
                        >
                            <a
                                href="#"
                                className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                                data-bs-toggle="dropdown"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setDrodown(!dropdown);
                                }}
                            >
                                <em className="icon ni ni-more-h"/>
                            </a>
                            <div
                                className={`dropdown-menu dropdown-menu-end ${
                                    dropdown ? "show" : ""
                                }`}
                            >
                                <ul className="link-list-opt no-bdr">
                                    <li>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleOpenLink();
                                            }}
                                        >
                                            <em className="icon ni ni-eye"/>
                                            <span>{t('OpenLink')}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onEdit();
                                            }}
                                        >
                                            <em className="icon ni ni-edit"/>
                                            <span>{t('Edit')}</span>
                                        </a>
                                    </li>
                                    {/*{isAdmin && (*/}
                                        <li>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onDelete();
                                                }}
                                            >
                                                <em className="icon ni ni-trash"/>
                                                <span>{t('Delete')}</span>
                                            </a>
                                        </li>
                                    {/*)}*/}
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </td>
        </tr>
    );
};
