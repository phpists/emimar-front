import { useState } from "react";
import { useGetUsersQuery } from "../../../store/auth/auth.api";
import { Header } from "./Header/Header";
import { Table } from "./Table/Table";
import { UserModal } from "./UserModal";
import { UserPasswordModal} from "./UserPasswordModal"

export const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ sortBy: "id", sortDesc: false });
  const [search, setSearch] = useState("");

  const { data, refetch, isLoading } = useGetUsersQuery({
    page: currentPage,
    sortBy: sortConfig.sortBy,
    sortDesc: sortConfig.sortDesc,
    q: search,
  });
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal , setShowPasswordModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleSearch = (val) => setSearch(val);
  const handleChangePage = (page) => setCurrentPage(page);

  const handleChangeOrder = (config) => {
    const transformedConfig = {
      sortBy: config.key,
      sortDesc: config.order === "desc",
    };
    setSortConfig(transformedConfig);
  };

  const handleEditUser = (user) => {
    setShowModal(true);
    setEditUser(user);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser(null);
  };
  const handleChangePassword = (user) => {
    setShowPasswordModal(true);
    setEditUser(user);
  };
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
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
      {showPasswordModal && (
        <UserPasswordModal 
          onClosePasswordModal={handleClosePasswordModal}
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
        onChangePage={handleChangePage}
        onChangeOrder={handleChangeOrder}
        onRefetchUser={refetch}
        onEdit={handleEditUser}
        onEditPassword={handleChangePassword}
        isLoading={isLoading}
      />
    </div>
  );
};

