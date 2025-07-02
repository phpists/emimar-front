import {useMemo, useState} from "react";
import {useGetLinksQuery} from "../../store/projects/projects.api";
import { Header } from "./Header/Header";
import { Table } from "./Table/Table";
import {useDebounce} from "use-debounce";
import {CreateLink} from "./CreateLink";

export const Links = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [search, setSearch] = useState("");

    const [sortBy, setSortBy] = useState("id");
    const [sortDesc, setSortDesc] = useState(false);
    const [debouncedSearch] = useDebounce(search, 500);

    const queryArgs = useMemo(
        () => ({
            page: currentPage,
            sortBy,
            sortDesc,
        }),
        [currentPage, debouncedSearch, sortBy, sortDesc]
    );

    const { data, refetch, isLoading } = useGetLinksQuery(
        queryArgs,
        { refetchOnMountOrArgChange: true }
    );

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
                <CreateLink
                    onClose={handleCloseModal}
                    editData={editData}
                    onRefetchData={refetch}
                    total={data?.response?.links?.length + 1}
                />
            ) : null}
            <div className="nk-content-inner">
                <div className="nk-content-body">
                    <div className="nk-content">
                        <div className="container-fluid">
                            <div className="nk-content-inner">
                                <div className="nk-content-body">
                                    <Header
                                        // search={search}
                                        // onSearch={handleSearch}
                                        onCreate={() => setModal(true)}
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
