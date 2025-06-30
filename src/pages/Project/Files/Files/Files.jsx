import { FileCard } from "../../../../components/FileCard/FileCard";

export const Files = ({
    data,
    selected,
    onDelete,
    search,
    setDraggedItem,
    onOpen,
    onDownload,
    debouncedSearch,
    isSearching,
    isAdmin,
    onMoveUp
}) => {
    const filteredFiles = isSearching
        ? data
        : data?.filter(({ parent_id }) => parent_id === selected);

    if (filteredFiles?.length === 0) {
        return null;
    }
    if (search !== debouncedSearch) {
        return null;
    }

    return (
        <div className="nk-files-group">
            <h6 className="title">Files</h6>
            <div className="nk-files-list">
                {filteredFiles?.map(({ id, name, size, created_at, full_name }) => (
                    <FileCard
                        key={id}
                        name={name}
                        type={name?.split(".")?.[1]}
                        size={size}
                        date={created_at}
                        onDelete={() => onDelete({ id, name, type: "file" })}
                        draggable
                        onDragStart={() => setDraggedItem({ id, type: "file" })}
                        onOpen={() => onOpen({ url: full_name })}
                        onDownload={() => onDownload({ id, name })}
                        onMoveUp={() => onMoveUp(id)}
                        isAdmin={isAdmin}
                    />
                ))}
            </div>
        </div>
    );
};
