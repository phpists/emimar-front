import { useState } from "react";
import { Header } from "./Header";
import { Row } from "./Row";
import { useLazyDeleteGroupQuery } from "../../../../store/groups/groups.api";
import { ConfirmDeleteModal } from "../../../../components/ConfirmModal";
import { Loading } from "../../../../components/Loading";
import { EmptyMessage } from "../../../../components/EmptyMessage";

export const Table = ({ data, search, onRefetch, onEdit, isLoading }) => {
  const [deleting, setDeleting] = useState(null);
  const [deleteGroup] = useLazyDeleteGroupQuery();
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
      Promise.all(deletingItems?.map((id) => deleteGroup(id))).finally(() => {
        onRefetch();
      });
    } else {
      deleteGroup(deleting?.id).then((resp) => {
        if (resp.isSuccess) {
          onRefetch();
          setSelected(selected.filter((s) => s !== deleting?.id));
        }
      });
    }
    handleCloseDeleting();
  };

  const handleSortGroups = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, order: prev.order === "asc" ? "desc" : "asc" };
      }
      return { key, order: "asc" };
    });
  };

  const sortedData = data?.response
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
              ? `${deletingItems?.length} groups`
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
                  isSelectedAll={selected.length === data?.response?.length}
                  onSelectAll={() =>
                    setSelected(
                      selected.length === data?.response?.length
                        ? []
                        : data?.response?.map((v) => v.id)
                    )
                  }
                  onDelete={() => setDeletingItems(selected)}
                />
              </thead>
              <tbody>
                {sortedData?.map(({ id, title, create_at, user }) => (
                  <Row
                    key={id}
                    title={title}
                    createAt={create_at}
                    users={user?.map((u) => u?.display_name)?.join(", ")}
                    onEdit={() =>
                      onEdit({
                        id,
                        title,
                        create_at,
                        users: user?.map((u) => u.id),
                      })
                    }
                    onDelete={() => setDeleting({ title, id })}
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
                ))}
              </tbody>
            </table>
            {isLoading ? <Loading /> : null}
            {data?.response?.length === 0 && !isLoading ? (
              <EmptyMessage title="No groups found" />
            ) : null}
          </div>
          {/* <Pagination /> */}
        </div>
      </div>
    </div>
  );
};
