import {useEffect, useMemo, useRef, useState} from "react";
import { useLocation, useNavigate } from "react-router";
import { useClickOutside } from "../../../hooks";
import { useGetProjectsQuery } from "../../../store/projects/projects.api";
import { useActions } from "../../../hooks/actions";
import { useAppSelect } from "../../../hooks/redux";
import {useTranslation} from "react-i18next";

export const Projects = ({data, search, onSearch}) => {
  const { projectData } = useAppSelect((state) => state.projects);

  const { pathname } = useLocation();
  const { t } = /** @type {any} */ useTranslation('common');
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();
  const { selectProject, selectItem  } = useActions();
  const { selectedProject } = useAppSelect((state) => state.auth);
  const navigate = useNavigate();

  useClickOutside(dropdownRef, () => {
    setShow(false);
    onSearch("");
  });

  const projects = useMemo(() => {
    return (
        data?.response?.project?.map((p) => ({
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
    onSearch("");
  };

  useEffect(() => {
    if (!selectedProject) {
      navigate("/");
    }
  }, []);

  if (pathname !== "/project") {
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
              {projectData?.project_number && `Project No. ${projectData.project_number}`}
            </a>
            <div className={`dropdown-menu left ${show ? "show" : ""}`} style={{}}>
              <ul className="link-list-opt no-bdr" style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
                <li>
                  <div className="nk-fmg-search project-search">
                    <em className="icon ni ni-search" />
                    <input
                      type="text"
                      className="form-control border-transparent form-focus-none"
                      placeholder={t('SearchProjectNumber')}
                      value={search}
                      onChange={(e) => onSearch(e.target.value)}
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
