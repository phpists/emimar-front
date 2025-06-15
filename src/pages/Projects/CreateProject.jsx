import { useEffect, useState } from "react";
import { useGetGroupsQuery } from "../../store/groups/groups.api";
import { useGetUsersQuery } from "../../store/auth/auth.api";
import {
  useLazyCreateProjectQuery,
  useLazyUpdateProjectQuery,
} from "../../store/projects/projects.api";
import { toast } from "react-toastify";
import { useActions } from "../../hooks/actions";
import { useNavigate } from "react-router";
import Select from "react-select";

export const CreateProject = ({ onClose, editData, onRefetchData, total }) => {
  const { data: groupsList } = useGetGroupsQuery();
  const { data: usersList } = useGetUsersQuery({ perPage: 100 });
  const [data, setData] = useState({
    title: `Project #${total}`,
    users: [],
    groups: [],
    rules_type: "users",
  });
  const [createProject] = useLazyCreateProjectQuery();
  const [updateProject] = useLazyUpdateProjectQuery();
  const [loading, setLoading] = useState(false);
  const { selectProject } = useActions();
  const navigate = useNavigate();

  const handleOpenProject = (id) => {
    selectProject(id);
    navigate("/project");
  };

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");
    overlay?.classList.add("show");
    return () => overlay?.classList.remove("show");
  }, []);

  useEffect(() => {
    if (editData) {
      setData({
        id: editData?.id,
        title: editData?.title,
        users: editData?.user?.map((u) => u.id),
        groups: editData?.groups?.map((g) => g.id),
        rules_type: editData?.rules_type,
      });
    }
  }, [editData]);

  const handleSubmit = () => {
    setLoading(true);
    if (editData) {
      updateProject(data).then((resp) => {
        setLoading(false);
        if (resp.isSuccess) {
          onClose();
          onRefetchData();
          toast.success("Успешно сохранено");
        } else {
          toast.error("Ошибка");
        }
      });
    } else {
      createProject(data).then((resp) => {
        setLoading(false);
        if (resp.isSuccess) {
          handleOpenProject(resp?.data?.response?.id);
          //   onClose();
          //   onRefetchData();
          toast.success("Успешно создано");
        } else {
          toast.error("Ошибка");
        }
      });
    }
  };

  const handleGetOptions = () =>
    data?.rules_type === "users"
      ? usersList?.response?.users?.data?.map(({ id, display_name }) => ({
          value: id,
          label: display_name,
        }))
      : groupsList?.response?.map(({ title, id }) => ({
          value: id,
          label: title,
        }));

  console.log(data);
  return (
    <div
      className="modal fade show"
      tabIndex={-1}
      id="modalCreateProject"
      aria-modal="true"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editData ? "Edit" : "Create"} Project
            </h5>
            <a href="#" className="close" onClick={onClose} aria-label="Close">
              <em className="icon ni ni-cross" />
            </a>
          </div>

          <div className="modal-body">
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="project-name">
                  Project Name
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    id="project-name"
                    placeholder="Enter project name"
                    value={data.title}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Toggle Buttons */}
              <div className="form-group">
                <label className="form-label">Assign to:</label>
                <div className="d-flex gap-2 mb-2">
                  <button
                    type="button"
                    className={`btn p-2 btn-sm ${
                      data?.rules_type === "users"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setData({ ...data, rules_type: "users" })}
                  >
                    Users
                  </button>
                  <button
                    type="button"
                    className={`btn p-2 btn-sm ${
                      data?.rules_type === "groups"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setData({ ...data, rules_type: "groups" })}
                  >
                    Groups
                  </button>
                </div>
              </div>

              {/* Conditional Select */}
              <div className="form-group">
                <label className="form-label">
                  {data?.rules_type === "users"
                    ? "Assign Users"
                    : "Assign Groups"}
                </label>
                <Select
                  isMulti
                  name="colors"
                  options={handleGetOptions()}
                  value={handleGetOptions()?.filter((v) =>
                    data?.[data.rules_type]?.includes(v.value)
                  )}
                  onChange={(e) => {
                    setData({
                      ...data,
                      [data?.rules_type]: e.map((v) => v.value),
                    });
                  }}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </form>
          </div>

          <div className="modal-footer bg-light">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={
                data.title?.length === 0 ||
                data?.[data?.rules_type]?.length === 0 ||
                loading
              }
            >
              {editData ? "Save" : "Create"}
            </button>
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
