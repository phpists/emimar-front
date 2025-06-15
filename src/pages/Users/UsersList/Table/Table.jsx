import { useState } from "react";
import { ConfirmDeleteModal } from "../../../../components/ConfirmModal";
import { Pagination } from "../../../../components/Pagination";
import { Header } from "./Header";
import { Row } from "./Row";
import { useLazyDeleteUserQuery } from "../../../../store/auth/auth.api";
import { Loading } from "../../../../components/Loading";
import { EmptyMessage } from "../../../../components/EmptyMessage";

export const Table = ({
  data,
  onChangePage,
  onRefetchUser,
  onEdit,
  isLoading,
}) => {
  const [deletingUser, setDeletingUser] = useState(null);
  const [deleteUser] = useLazyDeleteUserQuery();
  const [selected, setSelected] = useState([]);
  const [deletingItems, setDeletingItems] = useState([]);

  const handleCloseDeleting = () => {
    setDeletingUser(null);
    setDeletingItems([]);
    setSelected([]);
  };

  const handleDelete = () => {
    if (deletingItems?.length > 0) {
      Promise.all(deletingItems?.map((id) => deleteUser(id))).finally(() => {
        onRefetchUser();
      });
    } else {
      deleteUser(deletingUser?.id).then((resp) => {
        if (resp.isSuccess) {
          onRefetchUser();
          setSelected(selected.filter((s) => s !== deletingUser?.id));
        }
      });
    }
    handleCloseDeleting();
  };

  return (
    <div className="nk-block">
      {(deletingUser || deletingItems?.length > 0) && (
        <ConfirmDeleteModal
          onClose={handleCloseDeleting}
          onConfirm={handleDelete}
          title={`Are you sure you want to delete ${
            deletingItems?.length > 0
              ? `${deletingItems?.length} users`
              : deletingUser?.title
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
                    selected.length === data?.response?.users?.data?.length
                  }
                  onSelectAll={() =>
                    setSelected(
                      selected.length === data?.response?.users?.data?.length
                        ? []
                        : data?.response?.users?.data?.map((v) => v.id)
                    )
                  }
                  onDelete={() => setDeletingItems(selected)}
                />
              </thead>
              <tbody>
                {data?.response?.users?.data?.map(
                  ({ display_name, email, created_at, id, ...rest }) => (
                    <Row
                      key={id}
                      name={display_name}
                      email={email}
                      createdAt={created_at}
                      onDelete={() => setDeletingUser({ display_name, id })}
                      onEdit={() =>
                        onEdit({
                          display_name,
                          email,
                          created_at,
                          user_id: id,
                          ...rest,
                        })
                      }
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
            {data?.response?.users?.data?.length === 0 && !isLoading ? (
              <EmptyMessage title="No users found" />
            ) : null}
          </div>
          {isLoading ? null : (
            <Pagination
              currentPage={data?.response?.users?.current_page}
              lastPage={data?.response?.users?.last_page}
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
