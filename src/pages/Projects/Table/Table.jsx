import { useState } from "react";
import { Header } from "./Header";
import { Row } from "./Row";
import { useLazyDeleteGroupQuery } from "../../../store/groups/groups.api";
import { ConfirmDeleteModal } from "../../../components/ConfirmModal";
import { useLazyDeleteProjectQuery } from "../../../store/projects/projects.api";
import { Loading } from "../../../components/Loading";
import { EmptyMessage } from "../../../components/EmptyMessage";

export const Table = ({ data, search, onEdit, onRefetchData, isLoading }) => {
  const [deleting, setDeleting] = useState(null);
  const [deleteProject] = useLazyDeleteProjectQuery();
  const [selected, setSelected] = useState([]);
  const [deletingItems, setDeletingItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "create_at", order: "desc" });

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

    const handleSortGroups = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, order: prev.order === "asc" ? "desc" : "asc" };
      }
      return { key, order: "asc" };
    });
  };

  const sortedData = data?.response?.projects
    ?.filter((u) =>
      search?.length > 0
        ? u.title.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .slice() 
    .sort((a, b) => {
      const { key, order } = sortConfig;
    
      let aValue = a[key];
      let bValue = b[key];
    
      if (key === "users") {
        aValue = a.user?.length || 0;
        bValue = b.user?.length || 0;
      }

      if (key === "create_at") {
        const parseDate = (dateStr) => {
          const [day, month, year] = dateStr.split(".");
          return new Date(`${year}-${month}-${day}`);
        };
    
        aValue = parseDate(aValue);
        bValue = parseDate(bValue);
      }
    
      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();
    
      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });

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
                  onSortGroups={handleSortGroups}
                  sortConfig={sortConfig}
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
                />
              </thead>
              <tbody>
                {sortedData
                  ?.filter((u) =>
                    search?.length > 0
                      ? u.title.toLowerCase().includes(search.toLowerCase())
                      : true
                  )
                  ?.map(
                    ({ id, title, create_at, user, groups, rules_type } , index) => (
                      <Row
                        key={id}
                        index={index} 
                        title={title}
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
          {/* <Pagination /> */}
        </div>
      </div>
    </div>
  );
};
