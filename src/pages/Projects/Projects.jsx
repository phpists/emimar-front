import {useEffect, useMemo, useState} from "react";
import { useGetProjectsQuery } from "../../store/projects/projects.api";
import { Header } from "./Header/Header";
import { Table } from "./Table/Table";
import { CreateProject } from "./CreateProject";
import {useDebounce} from "use-debounce";

export const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("id");
  const [sortDesc, setSortDesc] = useState(true);
  const [searchType, setSearchType] = useState("1");
  const [debouncedSearch] = useDebounce(search, 500);

  const queryArgs = useMemo(
      () => ({
        page: currentPage,
        q: debouncedSearch,
        sortBy,
        sortDesc,
        search_type: searchType,
      }),
      [currentPage, debouncedSearch, sortBy, sortDesc, searchType]
  );

  const { data, refetch, isLoading } = useGetProjectsQuery(
      queryArgs,
      { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    refetch();
  }, [searchType]);

  const handleSearch = (val) => setSearch(val);

  const handleChangePage = (page) => setCurrentPage(page);

  const handleCloseModal = () => {
    setModal(false);
    setEditData(null);
  };

  const handleEdit = (data) => {
    setModal(true);
    setEditData(data);
  };

  return (
    <div className="nk-content p-0">
      {modal ? (
        <CreateProject
          onClose={handleCloseModal}
          editData={editData}
          onRefetchData={refetch}
          total={data?.response?.projects?.data?.length + 1}
        />
      ) : null}
      <div className="nk-content-inner">
        <div className="nk-content-body">
          <div className="nk-content">
            <div className="container-fluid">
              <div className="nk-content-inner">
                <div className="nk-content-body">
                  <Header
                    search={search}
                    onSearch={handleSearch}
                    onCreate={() => setModal(true)}
                    searchType={searchType}
                    onSearchTypeChange={setSearchType}
                    total={data?.response?.count}
                  />
                  <Table
                    data={data}
                    onChangePage={handleChangePage}
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
                    onRefetchData={refetch}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
