import { Burger } from "./Burger";
import { Language } from "./Language/Language";
import { Notifications } from "./Notifications/Notifications";
import { Profile } from "./Profile/Profile";
import { Projects } from "./Projects/Projects";
import {useEffect, useMemo, useState} from "react";
import {useGetProjectsFastSearchQuery} from "../../store/projects/projects.api";
import {useAppSelect} from "../../hooks/redux";
import {useLocation} from "react-router";
import {useDebounce} from "use-debounce";

export const Header = ({ onToggleSidebar }) => {
  const { projectData } = useAppSelect((state) => state.projects);
  const { pathname } = useLocation();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const queryArgs = useMemo(
      () => ({
        q: debouncedSearch
      }),
      [debouncedSearch]
  );

  const { data, refetch } = useGetProjectsFastSearchQuery(
      queryArgs,
      { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    data && refetch();
  }, [pathname]);

  const handleSearch = (val) => setSearch(val);

  const isProjectPage = pathname.startsWith("/project");

  return (
    <div className="nk-header nk-header-fixed is-light">
      <div className="container-fluid">
        <div className="nk-header-wrap d-flex align-items-center justify-content-between">

          <div className="d-flex align-items-center gap-3">
            <Burger onToggleSidebar={onToggleSidebar}/>

            <Projects
                search={search}
                onSearch={handleSearch}
                data={data}
                refetch={refetch}
            />

            {(isProjectPage && projectData?.title) && (
                <>
                  <span className="fw-bold ms-2">{projectData.title}</span>
                  {projectData?.address && (
                      <small className="text-muted ms-2 fw-bold">{projectData.address}</small>
                  )}
                </>
            )}
          </div>

          <div className="nk-header-tools ms-2">
            <ul className="nk-quick-nav">
              {/*<Notifications/>*/}
              <Language/>
              <Profile/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
