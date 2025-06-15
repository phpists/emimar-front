const TABS = [
  { title: "Users", value: "users" },
  { title: "Groups", value: "groups" },
];

export const Tabs = ({ activeTab, onChangeTab }) => (
  <ul className="nav nav-tabs">
    {TABS.map(({ title, value }) => (
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
);
