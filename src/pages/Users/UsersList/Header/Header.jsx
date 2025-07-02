import {useTranslation} from "react-i18next";

export const Header = ({ onCreateUser, search, onSearch, total }) => {
    const { t } = /** @type {any} */ useTranslation('common');

    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    return (
    <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="nk-block-head-content">
                <h5 className="title">{t('UserList')}</h5>
                <div className="nk-block-des text-soft">
                    <p>{`${total !== 1 ? t('UsersTotalPlural', {count: total}) : t('UsersTotal', {count: total})}.`}</p>
                </div>
            </div>

            <div className="nk-block-head-content d-flex align-items-center gap-2">
                <div className="form-control-wrap">
                <input
                            type="text"
                            className="form-control"
                            placeholder={`${t('SearchUsers')}...`}
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={onCreateUser}>
                        + {t('CreateUser')}
                    </button>
                </div>

            </div>
        </div>
        );
        };
