import { useState } from "react";
import { useGetUsersQuery } from "../../../store/auth/auth.api";
import { Header } from "./Header/Header";
import { Table } from "./Table/Table";
import { UserModal } from "./UserModal";

export const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const { data, refetch, isLoading } = useGetUsersQuery({ 
    page: currentPage,
    sortBy,
    sortOrder,
    search
  });
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleChangePage = (page) => setCurrentPage(page);
  const handleEditUser = (user) => {
    setShowModal(true);
    setEditUser(user);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser(null);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="tab-pane fade show active">
      {showModal && (
        <UserModal
          onClose={handleCloseModal}
          onRefetchUser={refetch}
          editUser={editUser}
        />
      )}
      <Header onCreateUser={() => setShowModal(true)} search={search} onSearch={setSearch} />
      <Table
        data={data}
        onChangePage={handleChangePage}
        onRefetchUser={refetch}
        onEdit={handleEditUser}
        isLoading={isLoading}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </div>
  );
};
