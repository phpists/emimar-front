import { useState } from "react";
import { Header } from "./Header";
import { Row } from "./Row";
import { useLazyDeleteGroupQuery } from "../../../store/groups/groups.api";
import { ConfirmDeleteModal } from "../../../components/ConfirmModal";
import { useLazyDeleteLinkQuery } from "../../../store/projects/projects.api";
import { Loading } from "../../../components/Loading";
import { EmptyMessage } from "../../../components/EmptyMessage";
import {Pagination} from "../../../components/Pagination";
import {ROLES} from "../../../constats/roles";
import {useAppSelect} from "../../../hooks/redux";
import {useTranslation} from "react-i18next";

export const Table = ({
                          data,
                          onEdit,
                          onRefetchData,
                          onChangePage,
                          sortBy,
                          sortDesc,
                          onSortChange,
                          isLoading
                      }) => {
    const [deleting, setDeleting] = useState(null);
    const [deleteLink] = useLazyDeleteLinkQuery();
    const [selected, setSelected] = useState([]);
    const [deletingItems, setDeletingItems] = useState([]);
    const { t } = /** @type {any} */ useTranslation('common');

    const rawUser = useAppSelect((state) => state.auth.user);
    const user = rawUser?.user || rawUser;
    const isAdmin = user?.role_id === ROLES.ADMIN;

    const handleCloseDeleting = () => {
        setDeleting(null);
        setDeletingItems([]);
        setSelected([]);
    };

    const handleDelete = () => {
        if (deletingItems?.length > 0) {
            Promise.all(deletingItems?.map((id) => deleteLink(id))).finally(() => {
                onRefetchData();
            });
        } else {
            deleteLink(deleting?.id).then((resp) => {
                if (resp.isSuccess) {
                    onRefetchData();
                    setSelected(selected.filter((s) => s !== deleting?.id));
                }
            });
        }
        handleCloseDeleting();
    };

    return (
        <div className="nk-block">
            {(deleting || deletingItems?.length > 0) && (
                <ConfirmDeleteModal
                    onClose={handleCloseDeleting}
                    onConfirm={handleDelete}
                    title={`${t('AreYouSureYouWantToDelete')} ${
                        deletingItems?.length > 0
                            ? `${deletingItems?.length} projects`
                            : deleting?.name
                    }`}
                />
            )}
            <div className="card card-bordered card-stretch">
                <div className="card-inner-group">
                    <div className="card-inner p-0">
                        <table className="nk-tb-list nk-tb-ulist">
                            <thead>
                            <Header
                                onDelete={() => setDeletingItems(selected)}
                                sortBy={sortBy}
                                sortDesc={sortDesc}
                                onSortChange={onSortChange}
                                isAdmin={isAdmin}
                            />
                            </thead>
                            <tbody>
                            {data?.response?.links?.data?.map(
                                ({ id, name, link, created_at }, index) => (
                                    <Row
                                        key={id}
                                        name={name}
                                        link={link}
                                        // isAdmin={isAdmin}
                                        index={(data?.response?.links?.current_page - 1) * data?.response?.links?.per_page + index + 1}
                                        createAt={created_at}
                                        onEdit={() =>
                                            onEdit({
                                                id,
                                                name,
                                                link,
                                                created_at
                                            })
                                        }
                                        onDelete={() => setDeleting({ id, name })}
                                        id={id}
                                    />
                                )
                            )}
                            </tbody>
                        </table>
                        {isLoading ? <Loading /> : null}
                        {data?.response?.links?.total === 0 && !isLoading ? (
                            <EmptyMessage title={t('NoLinksFound')} />
                        ) : null}
                    </div>
                    {isLoading ? null : (
                        <Pagination
                            currentPage={data?.response?.links?.current_page}
                            lastPage={data?.response?.links?.last_page}
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
