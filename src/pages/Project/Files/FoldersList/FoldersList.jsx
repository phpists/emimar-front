import { EmptyMessage } from "../../../../components/EmptyMessage";
import { FileCard } from "../../../../components/FileCard/FileCard";
import {useEffect, useState} from "react";

export const FoldersList = ({
    data,
    selected,
    onEdit,
    onDelete,
    onSelectFolder,
    isSearching,
    debouncedSearch,
    search,
    onMove,
    draggedItem,
    setDraggedItem
}) => {
    const filteredFolders = isSearching
        ? data
        : data?.filter(({ parent_id }) => parent_id === null || parent_id === selected);

    if (search !== debouncedSearch) {
        return null;
    }

    return (
        <div className="nk-files-group">
            <h6 className="title">Folder</h6>
            <div className="nk-files-list">
                {filteredFolders?.length === 0 ? (
                    <EmptyMessage title="Empty" />
                ) : (
                    filteredFolders?.map(({ id, name, full_name, size, created_at }) => (
                        <FileCard
                            key={id}
                            name={full_name}
                            type="folder"
                            size={size}
                            date={created_at}
                            onEdit={() => onEdit({ id, name })}
                            onDelete={() => onDelete({ id, name, type: "folder" })}
                            onSelect={() => onSelectFolder({id: id, title: name})}
                            draggable
                            onDragStart={() => setDraggedItem({ id, type: "folder" })}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                if (draggedItem && draggedItem.id !== id) {
                                    onMove({
                                        fromId: draggedItem.id,
                                        toFolderId: id,
                                        type: draggedItem.type,
                                    });
                                }
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
