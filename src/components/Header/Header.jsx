import {useEffect} from "react";
import { Burger } from "./Burger";
import { Language } from "./Language/Language";
import { Notifications } from "./Notifications/Notifications";
import { Profile } from "./Profile/Profile";
import { Projects } from "./Projects/Projects";
import {useLazyGetUserQuery} from "../../store/auth/auth.api"

export const Header = ({ onToggleSidebar }) => {
  const [getUser, { data: user }] = useLazyGetUserQuery();

  useEffect(() => {
    getUser()
  }, [user])

  return (
    <div className="nk-header nk-header-fixed is-light">
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <Burger onToggleSidebar={onToggleSidebar} />
          <Projects />
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <Notifications />
              <Language />
              <Profile userData={user}/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
