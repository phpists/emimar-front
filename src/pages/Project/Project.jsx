import { useState } from "react";
import { useAppSelect } from "../../hooks/redux";
import {
  useGetProjectFileEntryQuery,
  useGetProjectThreeQuery,
} from "../../store/files/files.api";
import { Files } from "./Files/Files";
import { Three } from "./Three";
import { transformTree } from "./FileThree";

export const Project = () => {
  const { selectedProject } = useAppSelect((state) => state.auth);
  const { data: threeData, refetch: refetchThree } =
    useGetProjectThreeQuery(selectedProject);
  const { data: data, refetch } = useGetProjectFileEntryQuery(selectedProject);
  const [selected, setSelected] = useState();

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
