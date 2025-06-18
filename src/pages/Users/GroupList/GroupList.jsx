import {useMemo, useState} from "react";
import { Header } from "./Header/Header";
import { GroupModal } from "./GroupModal";
import { useGetGroupsQuery } from "../../../store/groups/groups.api";
import { Table } from "./Table/Table";
import {useDebounce} from "use-debounce";

export const GroupList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editGroup, setEditGroup] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("display_name");
  const [sortDesc, setSortDesc] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  console.log({ sortBy, sortDesc });

  const queryArgs = useMemo(
      () => ({
        page: currentPage,
        q: debouncedSearch,
        sortBy,
        sortDesc,
      }),
      [currentPage, debouncedSearch, sortBy, sortDesc]
  );

  const { data, refetch, isLoading } = useGetGroupsQuery(
      queryArgs,
      { refetchOnMountOrArgChange: true }
  );

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
          onCreateGroup={() => setShowModal(true)} />
      <Table
        data={data}
        onRefetch={refetch}
        onEdit={handleEdit}
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
