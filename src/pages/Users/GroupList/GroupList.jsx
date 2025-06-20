import { useState } from "react";
import { Header } from "./Header/Header";
import { GroupModal } from "./GroupModal";
import { useGetGroupsQuery } from "../../../store/groups/groups.api";
import { Table } from "./Table/Table";

export const GroupList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ sortBy: "id", sortDesc: false });
  const [search, setSearch] = useState("");
  const { data, refetch, isLoading } = useGetGroupsQuery({
    page: currentPage,
    sortBy: sortConfig.sortBy,
    sortDesc: sortConfig.sortDesc,
    q: search,
  });
  const [showModal, setShowModal] = useState(false);
  const [editGroup, setEditGroup] = useState(null);

  const handleSearch = (val) => setSearch(val);

  const handleChangeOrder = (config) => {
    const transformedConfig = {
      sortBy: config.key,
      sortDesc: config.order === "desc",
    };
    setSortConfig(transformedConfig);
  };

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
        onChangePage={handleChangePage}
        onChangeOrder={handleChangeOrder}
        onRefetch={refetch}
        onEdit={handleEdit}
        isLoading={isLoading}
      />
    </div>
  );
};
