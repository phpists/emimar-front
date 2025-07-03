import { useEffect, useState } from "react";
import {
  useLazyCreateGroupQuery,
  useLazyUpdateGroupQuery,
} from "../../../store/groups/groups.api";
import { toast } from "react-toastify";
import { useGetUsersQuery } from "../../../store/auth/auth.api";
import Select from "react-select";
import {useTranslation} from "react-i18next";

export const GroupModal = ({ onClose, editData, onRefreshData }) => {
  const [data, setData] = useState({ title: "", users: "" });
  const { data: users } = useGetUsersQuery({ page: 1, perPage: 100 });
  const [createGroup] = useLazyCreateGroupQuery();
  const [updateGroup] = useLazyUpdateGroupQuery();
  const { t } = /** @type {any} */ useTranslation('common');

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");

    overlay.classList.add("show");

    return () => overlay.classList.remove("show");
  }, []);

  useEffect(() => {
    if (editData) {
      setData({
        id: editData?.id,
        title: editData?.title,
        users: editData?.users,
      });
    }
  }, [editData]);

  const handleSubmit = () => {
    if (editData) {
      updateGroup(data).then((resp) => {
        if (resp.isSuccess) {
          onClose();
          onRefreshData();
          toast.success(t('SavedSuccessfully'));
        } else {
          toast.error(t('Error'));
        }
      });
    } else {
      createGroup(data).then((resp) => {
        if (resp.isSuccess) {
          onClose();
          onRefreshData();
          toast.success(t('SuccessfullyCreated'));
        } else {
          toast.error(t('Error'));
        }
      });
    }
  };

  const handleGetOptions = () =>
    users?.response?.users?.data?.map(({ id, display_name }) => ({
      value: id,
      label: display_name,
    }));

  return (
    <div
      className="modal fade show"
      tabIndex={-1}
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editData ? t('EditGroup') : t('CreateGroup')}
            </h5>
            <div className="close" onClick={onClose}>
              <em className="icon ni ni-cross" />
            </div>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">{t('Name')} <span className="text-danger">*</span></label>
              <input
                  type="text"
                className="form-control"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="project-users">
                {t('AssignUsers')} <span className="text-danger">*</span>
              </label>
              <Select
                  isMulti
                name="colors"
                options={handleGetOptions()}
                value={handleGetOptions()?.filter((v) =>
                  data?.users?.includes(v.value)
                )}
                onChange={(e) => {
                  setData({
                    ...data,
                    users: e.map((v) => v.value),
                  });
                }}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>
          <div className="modal-footer bg-light">
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={data?.title?.length === 0 || data?.users?.length === 0}
            >
              {editData ? t('Save') : t('Create')}
            </button>
            <button className="btn btn-light" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}>
              {t('Cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
