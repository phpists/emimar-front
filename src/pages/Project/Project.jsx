import { Files } from "./Files/Files";
import { Three } from "./Three";

export const Project = () => {
  return (
    <div className="nk-content p-0">
      <div className="nk-content-inner">
        <div className="nk-content-body">
          <div className="nk-fmg">
            <Three />
            <Files />
          </div>
        </div>
      </div>
    </div>
  );
};
