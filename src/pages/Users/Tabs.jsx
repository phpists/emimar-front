import {useTranslation} from "react-i18next";

export const Tabs = ({ activeTab, onChangeTab }) => {
  const { t } = /** @type {any} */ useTranslation('common');

  const TABS = [
    { title: t('Users'), value: "users" },
    { title: t('Groups'), value: "groups" },
  ];
  return <ul className="nav nav-tabs">
    {TABS.map(({title, value}) => (
        <li className="nav-item" key={value}>
          <a
              className={`nav-link ${activeTab === value ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                onChangeTab(value);
              }}
              href="#"
          >
            {title}
          </a>
        </li>
    ))}
  </ul>
};
