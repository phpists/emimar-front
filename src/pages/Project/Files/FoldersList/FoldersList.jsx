import { EmptyMessage } from "../../../../components/EmptyMessage";
import { FileCard } from "../../../../components/FileCard/FileCard";

export const FoldersList = ({
  data,
  selected,
  onEdit,
  onDelete,
  onSelectFolder,
  search,
  onMove,
  draggedItem,
  setDraggedItem
}) => {
  return (
    <div className="nk-files-group">
      <h6 className="title">Folder</h6>
      <div className="nk-files-list">
        {data?.filter(({ parent_id, full_name }) =>
          search
            ? full_name.toLowerCase().includes(search)
            : selected
            ? parent_id === selected
            : parent_id === null
        )?.length === 0 ? (
          <EmptyMessage title="Empty" />
        ) : (
          data
            ?.filter(({ parent_id, full_name }) =>
              search
                ? full_name.toLowerCase().includes(search)
                : selected
                ? parent_id === selected
                : parent_id === null
            )
            ?.map(({ id, full_name, size, created_at }) => (
              <FileCard
                key={id}
                name={full_name}
                type="folder"
                size={size}
                date={created_at}
                onEdit={() => onEdit({ id, full_name })}
                onDelete={() => onDelete({ id, full_name, type: "folder" })}
                onSelect={() => onSelectFolder(id)}
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
