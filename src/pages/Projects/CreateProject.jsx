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
import {useTranslation} from "react-i18next";

export const CreateProject = ({ onClose, editData, onRefetchData, total }) => {
  const { t } = /** @type {any} */ useTranslation('common');
  const { data: groupsList } = useGetGroupsQuery();
  const { data: usersList } = useGetUsersQuery({ perPage: 100 });
  const [data, setData] = useState({
    title: `Project `,
    address: "",
    project_number: "",
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
        address: editData.address ?? "",
        project_number: editData.project_number ?? "",
        users: editData?.user?.map((u) => u.id),
        groups: editData?.groups?.map((g) => g.id),
        rules_type: editData?.rules_type,
      });
    }
  }, [editData]);

  const handleSubmit = () => {
    if (data.title?.length === 0 || !data.address?.trim() || !data.project_number?.toString().trim() || data?.[data?.rules_type]?.length === 0) {
      toast.error(t('PleaseFillInAllRequiredFields'));
      return;
    }
    setLoading(true);
    if (editData) {
      updateProject(data).then((resp) => {
        setLoading(false);
        if (resp.isSuccess) {
          onClose();
          onRefetchData();
          toast.success(t('SavedSuccessfully'));
        } else {
          toast.error(t('Error'));
        }
      });
    } else {
      createProject(data).then((resp) => {
        setLoading(false);
        if (resp.isSuccess) {
          handleOpenProject(resp?.data?.response?.id);
          toast.success(t('SuccessfullyCreated'));
        } else {
          toast.error(t('Error'));
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
              {editData ? t('EditProject') : t('CreateProject')}
            </h5>
            <div className="close" onClick={onClose}>
              <em className="icon ni ni-cross"/>
            </div>
          </div>

          <div className="modal-body">
            <form>
              <div className="form-group">
              <label className="form-label" htmlFor="project-name">
                  {t('ProjectName')} <span className="text-danger">*</span>
                </label>
                <div className="form-control-wrap">
                  <input
                      type="text"
                      className="form-control"
                      id="project-name"
                      placeholder={t('EnterProjectName')}
                      value={data.title}
                      onChange={(e) =>
                          setData({...data, title: e.target.value})
                      }
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="project-number">
                  {t('ProjectNumber')} <span className="text-danger">*</span>
                </label>
                <div className="form-control-wrap">
                  <input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="form-control"
                      id="project-number"
                      placeholder={t('EnterProjectNumber')}
                      value={data.project_number}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) {
                          setData({ ...data, project_number: val }); // зберігаємо як string
                        }
                      }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="address">
                  {t('Address')} <span className="text-danger">*</span>
                </label>
                <div className="form-control-wrap">
                  <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder={t('EnterAddress')}
                      value={data.address}
                      onChange={(e) =>
                          setData({...data, address: e.target.value})
                      }
                  />
                </div>
              </div>

              {/* Toggle Buttons */}
              <div className="form-group">
                <label className="form-label">{t('AssignTo')}:</label>
                <div className="d-flex gap-2 mb-2">
                  <button
                      type="button"
                      className={`btn p-2 btn-sm ${
                          data?.rules_type === "users"
                              ? "btn-primary"
                              : "btn-outline-primary"
                      }`}
                      onClick={() => setData({...data, rules_type: "users"})}
                  >
                    {t('Users')}
                  </button>
                  <button
                      type="button"
                      className={`btn p-2 btn-sm ${
                          data?.rules_type === "groups"
                              ? "btn-primary"
                              : "btn-outline-primary"
                      }`}
                      onClick={() => setData({...data, rules_type: "groups"})}
                  >
                    {t('Groups')}
                  </button>
                </div>
              </div>

              {/* Conditional Select */}
              <div className="form-group">
                <label className="form-label">
                  {data?.rules_type === "users"
                      ? t('AssignUsers')
                      : t('AssignGroups')} <span className="text-danger">*</span>
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
                disabled={loading}
            >
              {editData ? t('Save') : t('Create')}
            </button>
            <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
            >
              {t('Cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
