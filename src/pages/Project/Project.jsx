import {useMemo, useState} from "react";
import { useAppSelect } from "../../hooks/redux";
import {
  useGetProjectFileEntryQuery,
  useGetProjectThreeQuery,
} from "../../store/files/files.api";
import { Files } from "./Files/Files";
import { Three } from "./Three";
// import { transformTree } from "./FileThree";
import {useDebounce} from "use-debounce";

const transformTree = (data, parentId = null) => {
  if (!Array.isArray(data)) return [];
  return data.map(item => {
    const node = {
      ...item,
      parent_id: parentId,
    };
    if (item.children?.length) {
      node.children = transformTree(item.children, item.id);
    }
    return node;
  });
};

export const Project = () => {
  const { selectedProject, selectedItem } = useAppSelect((state) => state.auth);
  const { data: threeData, refetch: refetchThree } =
    useGetProjectThreeQuery(selectedProject);
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const isSearching = Boolean(search);

  const tree = useMemo(() => {
    return transformTree(threeData?.response?.tree || []);
  }, [threeData]);

  const params = {
    project_id: selectedProject,
    q: debouncedSearch,
    ...(selected?.id ? { parent_id: selected.id } : {}),
  };

  const { data, refetch, isFetching } = useGetProjectFileEntryQuery(
      params,
      { refetchOnMountOrArgChange: true },
      { skip: !isSearching }
  );

  const handleSearch = (val) => setSearch(val);

  const handleSelectFolder = (data) => {
    setSelected(data);
  };

  const handleRefetchData = () => {
    if (data) {
      refetch();
      refetchThree();
    }
  };

  const handleGoUp = () => {
    if (!selected?.id || !tree) return;

    const findNodeById = (nodes, id) => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNodeById(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const currentNode = findNodeById(tree, selected.id);
    if (!currentNode?.parent_id) return;

    const parentNode = findNodeById(tree, currentNode.parent_id);
    if (parentNode) {
      setSelected(parentNode);
    }
  }

  const isRootSelected = useMemo(() => {
    const findNodeById = (nodes, id) => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNodeById(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };
    const currentNode = selected?.id ? findNodeById(tree, selected.id) : null;
    return !currentNode?.parent_id;
  }, [selected, tree]);

  return (
    <div className="nk-content p-0">
      <div className="nk-content-inner">
        <div className="nk-content-body">
          <div className="nk-fmg">
            <Three
              data={threeData}
              selected={selected?.id}
              onSelect={handleSelectFolder}
            />
            <Files
              data={data}
              search={search}
              isLoading={isFetching}
              debouncedSearch ={debouncedSearch}
              onSearch={handleSearch}
              isSearching={isSearching}
              selected={selected}
              onRefetchData={handleRefetchData}
              onSelectFolder={(id) => setSelected({id})}
              onGoUp={handleGoUp}
              isRootSelected={isRootSelected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
