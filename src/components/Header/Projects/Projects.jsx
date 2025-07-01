import {useEffect, useMemo, useRef, useState} from "react";
import { useLocation, useNavigate } from "react-router";
import { useClickOutside } from "../../../hooks";
import { useGetProjectsQuery } from "../../../store/projects/projects.api";
import { useActions } from "../../../hooks/actions";
import { useAppSelect } from "../../../hooks/redux";

export const Projects = ({data, refetch}) => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();
  const { selectProject, selectItem  } = useActions();
  const { selectedProject } = useAppSelect((state) => state.auth);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useClickOutside(dropdownRef, () => {
    setShow(false);
    setSearch("");
  });

  const projects = useMemo(() => {
    return (
        data?.response?.projects?.data
            ?.map((p) => ({
              id: p.id,
              title: p.title || "",
              project_number: String(p.project_number || ""),
            }))
            .sort((a, b) => {
              const numA = parseInt(a.project_number, 10);
              const numB = parseInt(b.project_number, 10);
              return numA - numB;
            }) || []
    );
  }, [data]);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return projects;

    return projects.filter((p) => {
      const numberStr = String(p.project_number || "");
      const label = `Project No. ${numberStr}`.toLowerCase();
      return numberStr.includes(query) || label.includes(query);
    });
  }, [search, projects]);

  const handleSelectProject = (id) => {
    selectProject(id);
    selectItem(null);
    setShow(false);
    setSearch("");
  };

  useEffect(() => {
    if (!selectedProject) {
      navigate("/");
    }
  }, []);

  if (pathname !== "/project" || !data?.response?.projects) {
    return null;
  }
  const currentProject = data?.response?.projects?.data?.find(
      (p) => p.id?.toString() === selectedProject?.toString()
  );

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
              {currentProject?.project_number
                  ? `Project No. ${currentProject.project_number}`
                  : "Loading..."}
            </a>
            <div className={`dropdown-menu left ${show ? "show" : ""}`} style={{}}>
              <ul className="link-list-opt no-bdr">
                <li>
                  <div className="nk-fmg-search project-search">
                    <em className="icon ni ni-search" />
                    <input
                      type="text"
                      className="form-control border-transparent form-focus-none"
                      placeholder="Search project number"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </li>
                <li className="divider" />
                {filteredProjects.map(({ project_number, id }) => (
                    <li
                      key={id}
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
                        // style={{display: "flex", justifyContent: "center"}}
                      >
                        <span>Project No. {project_number}</span>
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
