import { useState } from "react";
import { Header } from "./Header";
import { Row } from "./Row";
import { useLazyDeleteGroupQuery } from "../../../store/groups/groups.api";
import { ConfirmDeleteModal } from "../../../components/ConfirmModal";
import { useLazyDeleteProjectQuery } from "../../../store/projects/projects.api";
import { Loading } from "../../../components/Loading";
import { EmptyMessage } from "../../../components/EmptyMessage";
import {Pagination} from "../../../components/Pagination";
import {ROLES} from "../../../constats/roles";
import {useAppSelect} from "../../../hooks/redux";

export const Table = ({
  data,
  onEdit,
  onRefetchData,
  onChangePage,
  sortBy,
  sortDesc,
  onSortChange,
  isLoading
}) => {
  const [deleting, setDeleting] = useState(null);
  const [deleteProject] = useLazyDeleteProjectQuery();
  const [selected, setSelected] = useState([]);
  const [deletingItems, setDeletingItems] = useState([]);

  const rawUser = useAppSelect((state) => state.auth.user);
  const user = rawUser?.user || rawUser;
  const isAdmin = user?.role_id === ROLES.ADMIN;

  const handleCloseDeleting = () => {
    setDeleting(null);
    setDeletingItems([]);
    setSelected([]);
  };

  const handleDelete = () => {
    if (deletingItems?.length > 0) {
      Promise.all(deletingItems?.map((id) => deleteProject(id))).finally(() => {
        onRefetchData();
      });
    } else {
      deleteProject(deleting?.id).then((resp) => {
        if (resp.isSuccess) {
          onRefetchData();
          setSelected(selected.filter((s) => s !== deleting?.id));
        }
      });
    }
    handleCloseDeleting();
  };

  const handleCutList = (list) =>
    `${list?.slice(0,2)?.join(",")} ${
      list?.slice(2)?.length > 0 ? `... (+${list?.slice(2)?.length})` : ""
    }`;

  return (
    <div className="nk-block">
      {(deleting || deletingItems?.length > 0) && (
        <ConfirmDeleteModal
          onClose={handleCloseDeleting}
          onConfirm={handleDelete}
          title={`Are you sure you want to delete ${
            deletingItems?.length > 0
              ? `${deletingItems?.length} projects`
              : deleting?.title
          }`}
        />
      )}
      <div className="card card-bordered card-stretch">
        <div className="card-inner-group">
          <div className="card-inner p-0">
            <table className="nk-tb-list nk-tb-ulist">
              <thead>
                <Header
                  isSelectedAll={
                    selected.length === data?.response?.projects?.length
                  }
                  onSelectAll={() =>
                    setSelected(
                      selected.length === data?.response?.projects?.length
                        ? []
                        : data?.response?.projects?.map((v) => v.id)
                    )
                  }
                  onDelete={() => setDeletingItems(selected)}
                  sortBy={sortBy}
                  sortDesc={sortDesc}
                  onSortChange={onSortChange}
                  isAdmin={isAdmin}
                />
              </thead>
              <tbody>
                {data?.response?.projects?.data?.map(
                    ({ id, title, address, project_number, create_at, user, groups, rules_type }, index) => (
                      <Row
                        key={id}
                        title={title}
                        address={address}
                        project_number={project_number}
                        isAdmin={isAdmin}
                        index={(data?.response?.projects?.current_page - 1) * data?.response?.projects?.per_page + index + 1}
                        createAt={create_at}
                        users={handleCutList(user?.map((u) => u?.display_name))}
                        groups={handleCutList(groups?.map((u) => u?.title))}
                        onEdit={() =>
                          onEdit({
                            id,
                            title,
                            create_at,
                            user,
                            groups,
                            address,
                            project_number,
                            rules_type,
                          })
                        }
                        onDelete={() => setDeleting({ id, title })}
                        id={id}
                        selected={selected.includes(id)}
                        onSelect={() =>
                          setSelected(
                            selected.includes(id)
                              ? selected.filter((s) => s !== id)
                              : [...selected, id]
                          )
                        }
                      />
                    )
                  )}
              </tbody>
            </table>
            {isLoading ? <Loading /> : null}
            {data?.response?.projects?.length === 0 && !isLoading ? (
              <EmptyMessage title="No projects found" />
            ) : null}
          </div>
          {isLoading ? null : (
              <Pagination
                  currentPage={data?.response?.projects?.current_page}
                  lastPage={data?.response?.projects?.last_page}
                  onPageChange={(page) => {
                    onChangePage(page);
                  }}
              />
          )}
        </div>
      </div>
    </div>
  );
};
