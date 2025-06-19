import { useState } from "react";
import { Header } from "./Header/Header";
import { GroupModal } from "./GroupModal";
import { useGetGroupsQuery } from "../../../store/groups/groups.api";
import { Table } from "./Table/Table";

export const GroupList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading } = useGetGroupsQuery({ page: currentPage });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editGroup, setEditGroup] = useState(null);

  const handleSearch = (val) => setSearch(val);
  const handleChangePage = (page) => setCurrentPage(page);
  const handleEdit = (group) => {
    setShowModal(true);
    setEditGroup(group);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditGroup(null);
  };
  return (
    <div className="tab-pane fade show active">
      {showModal && (
        <GroupModal
          onClose={handleCloseModal}
          onRefreshData={refetch}
          editData={editGroup}
        />
      )}
      <Header 
        search={search}
        onSearch={handleSearch}
        onCreateGroup={() => setShowModal(true)} 
      />
      <Table
        data={data}
        search={search}
        onChangePage={handleChangePage}
        onRefetch={refetch}
        onEdit={handleEdit}
        isLoading={isLoading}
      />
    </div>
  );
};
