import { useState } from "react";
import { useGetUsersQuery } from "../../../store/auth/auth.api";
import { Header } from "./Header/Header";
import { Table } from "./Table/Table";
import { UserModal } from "./UserModal";

export const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading } = useGetUsersQuery({ page: currentPage });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleSearch = (val) => setSearch(val);
  const handleChangePage = (page) => setCurrentPage(page);
  const handleEditUser = (user) => {
    setShowModal(true);
    setEditUser(user);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser(null);
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
      <Header 
        search={search}
        onSearch={handleSearch}
        onCreateUser={() => setShowModal(true)} 
      />
      <Table
        data={data}
        search={search}
        onChangePage={handleChangePage}
        onRefetchUser={refetch}
        onEdit={handleEditUser}
        isLoading={isLoading}
      />
    </div>
  );
};
