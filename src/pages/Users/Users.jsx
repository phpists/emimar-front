import { useState } from "react";
import { UsersList } from "./UsersList/UsersList";
import { GroupList } from "./GroupList/GroupList";
import { Tabs } from "./Tabs";

export const Users = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div>
      <div className="nk-content p-4">
        <Tabs activeTab={activeTab} onChangeTab={(tab) => setActiveTab(tab)} />
        <div className="tab-content mt-4">
          {activeTab === "users" && <UsersList />}
          {activeTab === "groups" && <GroupList />}
        </div>
      </div>
    </div>
  );
};
