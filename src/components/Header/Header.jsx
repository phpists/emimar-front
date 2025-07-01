import { Burger } from "./Burger";
import { Language } from "./Language/Language";
import { Notifications } from "./Notifications/Notifications";
import { Profile } from "./Profile/Profile";
import { Projects } from "./Projects/Projects";
import {useEffect, useMemo} from "react";
import {useGetProjectsQuery} from "../../store/projects/projects.api";
import {useAppSelect} from "../../hooks/redux";
import {useLocation} from "react-router";

export const Header = ({ onToggleSidebar }) => {
  const { selectedProject } = useAppSelect((state) => state.auth);
  const { pathname } = useLocation();

  const queryArgs = useMemo(
      () => ({
        page: 1,
        sortBy: 'id',
        perPage: 1000
      }),
      []
  );

  const { data, refetch } = useGetProjectsQuery(
      queryArgs
  );

  useEffect(() => {
    data && refetch();
  }, [pathname]);


  const project = data?.response?.projects?.data?.find(
      (p) => p.id?.toString() === selectedProject?.toString()
  );
  const isProjectPage = pathname.startsWith("/project");
  return (
    <div className="nk-header nk-header-fixed is-light">
      <div className="container-fluid">
        <div className="nk-header-wrap d-flex align-items-center justify-content-between">

          <div className="d-flex align-items-center gap-3">
            <Burger onToggleSidebar={onToggleSidebar}/>

            <Projects data={data} refetch={refetch}/>

            {isProjectPage && project?.title && (
                <>
                  <span className="fw-bold ms-2">{project.title}</span>
                  {project.address && (
                      <small className="text-muted ms-2 fw-bold">{project.address}</small>
                  )}
                </>
            )}
          </div>

          <div className="nk-header-tools ms-2">
            <ul className="nk-quick-nav">
              <Notifications/>
              <Language/>
              <Profile/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
