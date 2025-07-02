import { useState } from "react";
import { GroupModal } from "../GroupModal";
import {useTranslation} from "react-i18next";

export const Header = ({ onCreateGroup, search, onSearch, total }) => {
    const { t } = /** @type {any} */ useTranslation('common');

    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };
    return (
    <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="nk-block-head-content">
                <h5 className="title">{t('GroupList')}</h5>
                <div className="nk-block-des text-soft">
                    <p>{`${total !== 1 ? t('GroupsTotalPlural', {count: total}) : t('GroupsTotal', {count: total})}.`}</p>
                </div>
            </div>
            <div className="nk-block-head-content d-flex align-items-center gap-2">
                <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`${t('SearchGroups')}...`}
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={onCreateGroup}>
                        + {t('CreateGroup')}
                    </button>
                </div>
            </div>
        </div>
        );
        };
