import { Burger } from "./Burger";
import { Language } from "./Language/Language";
import { Notifications } from "./Notifications/Notifications";
import { Profile } from "./Profile/Profile";
import { Projects } from "./Projects/Projects";

export const Header = ({ onToggleSidebar }) => {
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
              <Profile />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
