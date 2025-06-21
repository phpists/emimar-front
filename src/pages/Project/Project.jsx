import { useState } from "react";
import { useAppSelect } from "../../hooks/redux";
import {
  useGetProjectFileEntryQuery,
  useGetProjectThreeQuery,
} from "../../store/files/files.api";
import { Files } from "./Files/Files";
import { Three } from "./Three";

export const Project = () => {
  const { selectedProject } = useAppSelect((state) => state.auth);
  const [searchParams, setSearchParams] = useState({q: "", parent_id: null});
  const [selectedFolderName, setSelectedFolderName] = useState("");

  const {data: threeData, refetch: refetchThree} = useGetProjectThreeQuery(selectedProject);
  const {data: data, refetch} = useGetProjectFileEntryQuery({
    project_id: selectedProject,
    q: searchParams.q,
    parent_id: searchParams.parent_id
  });
  const [selected, setSelected] = useState();

  const handleSelectFolder = (id) => {
    setSelected((prevSelected) => (prevSelected === id ? null : id));
  
    const findNameById = (tree) => {
      if (!tree) return null;
      for (const node of tree) {
        if (node.id === id) return node.name;
        if (node.children) {
          const result = findNameById(node.children);
          if (result) return result;
        }
      }
      return null;
    };
  
    const name = findNameById(threeData?.response?.tree);
    setSelectedFolderName(name || "");
    setSearchParams((prev) => ({ ...prev, parent_id: id }));
  };  

  const handleRefetchData = () => {
    if (data) {
      refetch();
      refetchThree();
    }
  };

  const handleSearch = (val) => {
    setSearchParams(val)
  };

  return (
    <div className="nk-content p-0">
      <div className="nk-content-inner">
        <div className="nk-content-body">
          <div className="nk-fmg">
            <Three
              data={threeData}
              selected={selected}
              onSelect={handleSelectFolder}
            />
            <Files
              selectedFolderName={selectedFolderName}
              data={data}
              selected={selected}
              onRefetchData={handleRefetchData}
              onSelectFolder={(id) => setSelected(id)}
              onSearch={handleSearch}
              onSelectSearchFolder={handleSelectFolder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
