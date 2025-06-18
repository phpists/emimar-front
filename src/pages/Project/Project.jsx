import { useState } from "react";
import { useAppSelect } from "../../hooks/redux";
import {
  useGetProjectFileEntryQuery,
  useGetProjectThreeQuery,
} from "../../store/files/files.api";
import { Files } from "./Files/Files";
import { Three } from "./Three";
import { transformTree } from "./FileThree";
import {useDebounce} from "use-debounce";

export const Project = () => {
  const { selectedProject } = useAppSelect((state) => state.auth);
  console.log(selectedProject);
  const { data: threeData, refetch: refetchThree } =
    useGetProjectThreeQuery(selectedProject);
  const [selected, setSelected] = useState();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const params = {
    project_id: selectedProject,
    q: debouncedSearch,
    ...(threeData?.parent_id ? { parent_id: threeData.parent_id } : {}),
  };

  const { data, refetch } = useGetProjectFileEntryQuery(
      params,
      { refetchOnMountOrArgChange: true }
  );

  console.log({threeData, data});

  const handleSearch = (val) => setSearch(val);

  const handleSelectFolder = (id) => {
    setSelected(id);
  };

  const handleRefetchData = () => {
    if (data) {
      refetch();
      refetchThree();
    }
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
              data={data}
              search={search}
              onSearch={handleSearch}
              selected={selected}
              onRefetchData={handleRefetchData}
              onSelectFolder={(id) => setSelected(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
