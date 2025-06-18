import {useMemo, useState} from "react";
import { useGetUsersQuery } from "../../../store/auth/auth.api";
import { Header } from "./Header/Header";
import { Table } from "./Table/Table";
import { UserModal } from "./UserModal";
import {UserModalChangePassword} from "./UserModalChangePassword";
import {useDebounce} from "use-debounce";

export const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModalChangePassword, setShowModalChangePassword] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [userChangePassword, setUserChangePassword] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("display_name");
  const [sortDesc, setSortDesc] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const queryArgs = useMemo(
      () => ({
        page: currentPage,
        q: debouncedSearch,
        sortBy,
        sortDesc,
      }),
      [currentPage, debouncedSearch, sortBy, sortDesc]
  );

  const { data, refetch, isLoading } = useGetUsersQuery(
      queryArgs,
      { refetchOnMountOrArgChange: true }
  );

  const handleSearch = (val) => setSearch(val);

  const handleChangePage = (page) => setCurrentPage(page);
  const handleEditUser = (user) => {
    setShowModal(true);
    setEditUser(user);
  };
  const handleChangePassword = ({...userData}) => {
    setShowModalChangePassword(true);
    setUserChangePassword({...userData});
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalChangePassword(false);
    setEditUser(null);
    setUserChangePassword(null);
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
      {showModalChangePassword && (
          <UserModalChangePassword
              onClose={handleCloseModal}
              userChangePassword={userChangePassword}
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
        onRefetchUser={refetch}
        onEdit={handleEditUser}
        onChangePassword={handleChangePassword}
        sortBy={sortBy}
        sortDesc={sortDesc}
        onSortChange={(column) => {
          if (sortBy === column) {
            setSortDesc((prev) => !prev);
          } else {
            setSortBy(column);
            setSortDesc(false);
          }
        }}
        isLoading={isLoading}
      />
    </div>
  );
};
