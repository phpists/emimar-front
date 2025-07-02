import {useAppSelect} from "../../../hooks/redux";
import {ROLES} from "../../../constats/roles";
import {useTranslation} from "react-i18next";

export const Header = ({ search, onSearch, onCreate, total, searchType, onSearchTypeChange }) => {

    const { t } = /** @type {any} */ useTranslation('common');

    // const rawUser = useAppSelect((state) => state.auth.user);
    // const user = rawUser?.user || rawUser;

    // const isAdmin = user?.role_id === ROLES.ADMIN;

    // const handleSearchChange = (e) => {
    //     onSearch(e.target.value);
    // };

    return (
        <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-between">
                <div className="nk-block-head-content">
                    <h3 className="nk-block-title page-title">{t('Links')}</h3>
                    <div className="nk-block-des text-soft">
                        <p>{t('LinksTotal', { count: total })}</p>
                    </div>
                </div>
                <div className="nk-block-head-content d-flex align-items-center gap-2">

                    {/* Поле пошуку */}
                    {/*<div className="form-control-wrap">*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        className="form-control"*/}
                    {/*        placeholder="Search projects..."*/}
                    {/*        value={search}*/}
                    {/*        onChange={handleSearchChange}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className="toggle-wrap nk-block-tools-toggle">
                        <a
                            href="#"
                            className="btn btn-icon btn-trigger toggle-expand me-n1"
                            data-target="pageMenu"
                        >
                            <em className="icon ni ni-menu-alt-r"/>
                        </a>
                        <div className="toggle-expand-content" data-content="pageMenu">
                            <ul className="nk-block-tools g-3">
                                {/*{isAdmin && (*/}
                                    <li className="nk-block-tools-opt d-none d-sm-block">
                                        <a
                                            href="#"
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onCreate();
                                            }}
                                        >
                                            <em className="icon ni ni-plus"/>
                                            <span>{t('AddLink')}</span>
                                        </a>
                                    </li>
                                {/*)*/}
                                {/*}*/}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
