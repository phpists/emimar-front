import { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import { MobileSidebar } from "../components/MobileSidebar";
import { Sidebar } from "../components/Sidebar";
import { useLocation } from "react-router";

export const ContentWrapper = ({ children }) => {
  const { pathname } = useLocation();
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const handleToggleMobileSidebar = () => setMobileSidebar(!mobileSidebar);

  useEffect(() => {
    mobileSidebar && setMobileSidebar(false);
  }, [pathname]);

  return (
    <div className="nk-body npc-apps apps-only has-apps-sidebar npc-apps-files no-touch nk-nio-theme has-sidebar">
      <div className="nk-app-root">
        <Sidebar />
        <div className="nk-main">
          <div className="nk-wrap">
            <Header onToggleSidebar={handleToggleMobileSidebar} />
            <MobileSidebar active={mobileSidebar} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
