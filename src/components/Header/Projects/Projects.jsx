import {useEffect, useMemo, useRef, useState} from "react";
import { useLocation, useNavigate } from "react-router";
import { useClickOutside } from "../../../hooks";
import { useGetProjectsQuery } from "../../../store/projects/projects.api";
import { useActions } from "../../../hooks/actions";
import { useAppSelect } from "../../../hooks/redux";

export const Projects = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();
  const { selectProject } = useActions();
  const { selectedProject } = useAppSelect((state) => state.auth);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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

  useClickOutside(dropdownRef, () => {
    setShow(false);
    setSearch("");
  });

  const handleSelectProject = (id) => {
    selectProject(id);
    setShow(false);
    setSearch("");
  };

  useEffect(() => {
    if (!selectedProject) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    data && refetch();
  }, [pathname]);

  if (pathname !== "/project" || !data?.response?.projects) {
    return null;
  }

  return (
    <div className="nk-header-app-name">
      <div className="nk-header-app-logo">
        <em className="icon ni ni-folder bg-purple-dim" />
      </div>
      <div className="nk-header-app-info">
        <span className="lead-text">
          <div ref={dropdownRef} className="dropdown">
            <a
              href="#"
              className={`dropdown-toggle btn btn-light ${show ? "show" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setShow(!show);
              }}
            >
              {
                data?.response?.projects?.data?.find(
                  (p) => p.id?.toString() === selectedProject?.toString()
                )?.title
              }
            </a>
            <div className={`dropdown-menu left ${show ? "show" : ""}`} style={{}}>
              <ul className="link-list-opt no-bdr">
                <li>
                  <div className="nk-fmg-search project-search">
                    <em className="icon ni ni-search" />
                    <input
                      type="text"
                      className="form-control border-transparent form-focus-none"
                      placeholder="Search files, folders"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </li>
                <li className="divider" />
                {data?.response?.projects?.data
                  ?.filter(({ title }) =>
                    search?.length > 0
                      ? title.toLowerCase().includes(search.toLowerCase())
                      : true
                  )
                  ?.map(({ title, id }) => (
                    <li
                      className={
                        selectedProject?.toString() === id?.toString()
                          ? "active"
                          : ""
                      }
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectProject(id);
                        }}
                      >
                        <span>{title}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};
