import { Info } from "./Info";
import { Password } from "./Password";

export const Profile = () => {
  return (
    <div className="user-settings">
      <Info />
      <Password />
    </div>
  );
};
